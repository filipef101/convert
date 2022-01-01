import type Decimal from 'decimal.js';
import * as Best from './best.js';

export const enum KelvinNames {
	/* eslint-disable @typescript-eslint/naming-convention */
	kelvin = 'kelvin',
	kelvins = 'kelvins',
	K = 'K',
	/* eslint-enable @typescript-eslint/naming-convention */
}

/**
 * IDs for conversion families.
 * @public
 */
export const enum Id {
	Angle,
	Area,
	Data,
	Force,
	Length,
	Mass,
	Pressure,
	Temperature,
	Time,
	Volume,
}

export type Numeric = number | Decimal;

interface BaseConversion {
	ratio: Numeric;
	difference?: Numeric | undefined;
}

interface OnlySymbolConversion extends BaseConversion {
	names?: undefined;
	symbols: string[];
}

interface NamedConversion extends BaseConversion {
	names: string[];
	symbols?: string[] | undefined;
}

export type Conversion = OnlySymbolConversion | NamedConversion;

export interface Family {
	id: Id;

	best: string[] | Record<Best.Kind, string[]>;

	conversions: Conversion[];
}

export {Best};
