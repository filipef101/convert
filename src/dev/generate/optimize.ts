import {combineIterables, identical} from '@jonahsnider/util';
import {ConversionFamily, ConversionFamilyId} from '../types/common';
import * as Generated from '../types/generated';

export function optimize(conversionFamilies: readonly ConversionFamily[]): {
	conversions: Generated.Conversions;
	temperatureDifferences: Generated.TemperatureDifferences;
} {
	const conversions: Generated.Conversions = {};
	const temperatureDifferences: Generated.TemperatureDifferences = {};

	for (const conversionFamily of conversionFamilies) {
		for (const conversion of conversionFamily.conversions) {
			const names: Iterable<string> = combineIterables(conversion.names ?? [], conversion.symbols ?? []);

			for (const name of names) {
				const newConversion: Generated.Conversion = [conversionFamily.id, conversion.ratio];

				if (name in conversions && !identical(conversions[name], newConversion)) {
					throw new RangeError(`Conversion name conflict for ${name}`);
				}

				conversions[name] = newConversion;
				if (conversionFamily.id === ConversionFamilyId.Temperature && conversion.difference !== undefined && conversion.difference !== 0) {
					temperatureDifferences[name] = conversion.difference;
				} else if (conversion.difference !== undefined) {
					throw new RangeError('Only temperatures may specify a difference value');
				}
			}
		}
	}

	return {conversions, temperatureDifferences};
}
