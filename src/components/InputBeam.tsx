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
import { RayleighRange } from "../calculate";
import { Beam } from "../types";

export default function InputBeam({
  input_beam,
  setInputBeam,
  wavelength,
}: {
  input_beam: Beam;
  setInputBeam: (beam: Beam) => void;
  wavelength: number;
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
      key: "input_beam",
      optics: "Input beam",
      position: (
        <CustomInput
          className="max-w-20 justify-self-center"
          type="number"
          value={String(input_beam.position)}
          onValueChange={(value) => {
            setInputBeam({ ...input_beam, position: Number(value) });
          }}
        />
      ),
      waist: (
        <CustomInput
          className="max-w-20 justify-self-center"
          type="number"
          value={String(input_beam.waist)}
          onValueChange={(value) => {
            setInputBeam({ ...input_beam, waist: Number(value) });
          }}
        />
      ),
      rayleigh_range: RayleighRange(input_beam.waist, wavelength).toFixed(3),
    },
  ];

  return (
    <Table aria-label="Input beam">
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
