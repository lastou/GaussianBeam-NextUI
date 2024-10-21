import { CustomInput } from "./CustomInput";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { useState } from "react";
import { RayleighRange } from "../calculate";
import { Beam } from "../types";

export default function Probe({
  probe_position,
  setProbePosition,
  probe_beam,
  wavelength,
}: {
  probe_position: number;
  setProbePosition: (value: number) => void;
  probe_beam: Beam;
  wavelength: number;
}) {
  const [display_position, setDisplayPosition] = useState(
    String(probe_position)
  );

  function handleChangePosition(value: number) {
    setProbePosition(value);
    setDisplayPosition(String(value));
  }

  const columns = [
    {
      key: "optics",
      label: "Optics",
    },
    {
      key: "position",
      label: "Position(mm)",
    },
    {
      key: "beam_radius",
      label: "Beam radius(um)",
    },
    {
      key: "beam_curvature",
      label: "Beam curvature(mm)",
    },
    {
      key: "waist_position",
      label: "Waist position(mm)",
    },
    {
      key: "waist",
      label: "Waist(um)",
    },
    {
      key: "rayleigh_range",
      label: "Rayleigh range(mm)",
    },
  ];

  const rayleigh_range = RayleighRange(probe_beam.waist, wavelength);
  const z = probe_position - probe_beam.position;
  const rows = [
    {
      key: "probe",
      optics: "Probe",
      position: (
        <CustomInput
          className="max-w-20 justify-self-center"
          type="number"
          value={display_position}
          onValueChange={(value) => setDisplayPosition(value)}
          onBlur={(e) =>
            handleChangePosition(Number((e.target as HTMLInputElement).value))
          }
        />
      ),
      beam_radius: (
        probe_beam.waist * Math.sqrt(1 + (z / rayleigh_range) ** 2)
      ).toFixed(3),
      beam_curvature: (z * (1 + (rayleigh_range / z) ** 2)).toFixed(3),
      waist_position: probe_beam.position.toFixed(3),
      waist: probe_beam.waist.toFixed(3),
      rayleigh_range: rayleigh_range.toFixed(3),
    },
  ];

  return (
    <Table aria-label="Probe">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn className="text-center" key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell className="text-center">
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
