import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { RayleighRange } from "../calculate";
import { Beam } from "../types";

export default function OutputBeam({
  output_beam,
  wavelength,
  position_last_lens,
}: {
  output_beam: Beam;
  wavelength: number;
  position_last_lens: number;
}) {
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
      key: "relative_position",
      label: "Relative position(mm)",
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

  const rows = [
    {
      key: "output_beam",
      optics: "Output beam",
      position: output_beam.position.toFixed(3),
      relative_position: (output_beam.position - position_last_lens).toFixed(3),
      waist: output_beam.waist.toFixed(3),
      rayleigh_range: RayleighRange(output_beam.waist, wavelength).toFixed(3),
    },
  ];

  return (
    <Table aria-label="Output beam">
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
