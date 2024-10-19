import { Beam, Lens } from "./types";

export function Waist(rayleigh_range: number, wavelength: number): number {
  return Math.sqrt((rayleigh_range * wavelength) / Math.PI);
}

export function RayleighRange(waist: number, wavelength: number): number {
  return (Math.PI * waist ** 2) / wavelength;
}

export function TransformBeam(
  beam: Beam,
  lens: Lens,
  wavelength: number
): Beam {
  // q_out = 1/(1/q_in - 1/f)
  const q_in = {
    z: lens.position - beam.position,
    z0: RayleighRange(beam.waist, wavelength),
  };
  const q_out = {
    z:
      (lens.focus / ((lens.focus - q_in.z) ** 2 + q_in.z0 ** 2)) *
      ((lens.focus - q_in.z) * q_in.z - q_in.z0 ** 2),
    z0:
      (lens.focus / ((lens.focus - q_in.z) ** 2 + q_in.z0 ** 2)) *
      lens.focus *
      q_in.z0,
  };

  return {
    position: lens.position - q_out.z,
    waist: Waist(q_out.z0, wavelength),
  };
}
