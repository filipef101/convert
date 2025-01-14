import type {conversions} from 'bundled-conversions';
import type {Indexes} from 'optimized-conversions';
import type {Id as ConversionFamilyId} from 'conversions';

export type Units = Omit<typeof conversions, '__proto__'>;

type AllValues = {
	[Unit in keyof Units]: {unit: Unit; family: Units[Unit][Indexes.Conversion.Family]};
}[keyof Units];

type FamilyToUnit = {
	[P in AllValues['family']]: Extract<AllValues, {family: P}>['unit'];
};

/**
 * A string literal type for all units belonging to a given conversion family.
 * @public
 */
export type GetAliases<T extends ConversionFamilyId> = FamilyToUnit[T];

/**
 * Valid angle units.
 * @public
 */
export type Angle = GetAliases<ConversionFamilyId.Angle>;
/**
 * Valid area units.
 * @public
 */
export type Area = GetAliases<ConversionFamilyId.Area>;
/**
 * Valid data units.
 * @public
 */
export type Data = GetAliases<ConversionFamilyId.Data>;
/**
 * Valid energy units.
 * @public
 */
export type Energy = GetAliases<ConversionFamilyId.Energy>;
/**
 * Valid force units.
 * @public
 */
export type Force = GetAliases<ConversionFamilyId.Force>;
/**
 * Valid length units.
 * @public
 */
export type Length = GetAliases<ConversionFamilyId.Length>;
/**
 * Valid mass units.
 * @public
 */
export type Mass = GetAliases<ConversionFamilyId.Mass>;
/**
 * Valid power units.
 * @public
 */
export type Power = GetAliases<ConversionFamilyId.Power>;
/**
 * Valid pressure units.
 * @public
 */
export type Pressure = GetAliases<ConversionFamilyId.Pressure>;
/**
 * Valid temperature units.
 * @public
 */
export type Temperature = GetAliases<ConversionFamilyId.Temperature>;
/**
 * Valid time units.
 * @public
 */
export type Time = GetAliases<ConversionFamilyId.Time>;
/**
 * Valid volume units.
 * @public
 */
export type Volume = GetAliases<ConversionFamilyId.Volume>;

/**
 * A supported unit you can convert.
 * @public
 */
export type Unit = GetAliases<ConversionFamilyId>;

export type UnitToFamily = Record<Angle, ConversionFamilyId.Angle> &
	Record<Area, ConversionFamilyId.Area> &
	Record<Data, ConversionFamilyId.Data> &
	Record<Energy, ConversionFamilyId.Energy> &
	Record<Force, ConversionFamilyId.Force> &
	Record<Length, ConversionFamilyId.Length> &
	Record<Mass, ConversionFamilyId.Mass> &
	Record<Power, ConversionFamilyId.Power> &
	Record<Pressure, ConversionFamilyId.Pressure> &
	Record<Temperature, ConversionFamilyId.Temperature> &
	Record<Time, ConversionFamilyId.Time> &
	Record<Volume, ConversionFamilyId.Volume>;
