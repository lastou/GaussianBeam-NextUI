import { CustomInput } from "./CustomInput";
import { Button } from "@nextui-org/button";
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
import { Lens } from "../types";

export default function LensTable({
  lenses,
  setLenses,
  input_beam_position,
  default_lens,
}: {
  lenses: Lens[];
  setLenses: (lenses: Lens[]) => void;
  input_beam_position: number;
  default_lens: Lens;
}) {
  const [position_display, setPositionDisplay] = useState(
    lenses.map((lens) => lens.position)
  );

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
      key: "focus",
      label: "Focus(mm)",
    },
    {
      key: "action",
      label: (
        <Button
          className="w-20"
          color="primary"
          size="sm"
          onClick={() => handleAddLens()}
        >
          Add lens
        </Button>
      ),
    },
  ];

  const rows = lenses.map((lens, index) => ({
    key: index,
    optics: "Lens",
    position: (
      <CustomInput
        className="max-w-20 justify-self-center"
        type="number"
        value={String(position_display[index])}
        onValueChange={(value) =>
          handleChangeDisplayPosition(index, Number(value))
        }
        onBlur={(e) =>
          handleChangePosition(
            index,
            Number((e.target as HTMLInputElement).value)
          )
        }
      />
    ),
    relative_position:
      index > 0
        ? lenses[index].position - lenses[index - 1].position
        : lenses[index].position - input_beam_position,
    focus: (
      <CustomInput
        className="max-w-20 justify-self-center"
        type="number"
        value={String(lens.focus)}
        onValueChange={(value) => handleChangeFocus(index, Number(value))}
      />
    ),
    action: (
      <Button
        className="w-20"
        color="danger"
        size="sm"
        onClick={() => handleDeleteLens(index)}
      >
        Delete
      </Button>
    ),
  }));

  function handleAddLens() {
    setLenses(
      [...lenses, default_lens].sort((a, b) => a.position - b.position)
    );
    setPositionDisplay(
      [...position_display, default_lens.position].sort((a, b) => a - b)
    );
  }

  function handleDeleteLens(index: number) {
    setLenses(lenses.filter((_, i) => i !== index));
    setPositionDisplay(position_display.filter((_, i) => i !== index));
  }

  function handleChangePosition(index: number, value: number) {
    setLenses(
      lenses
        .map((lens, i) => {
          if (i === index) {
            return { ...lens, position: value };
          } else {
            return lens;
          }
        })
        .sort((a, b) => a.position - b.position)
    );
    setPositionDisplay([...position_display].sort((a, b) => a - b));
  }

  function handleChangeFocus(index: number, value: number) {
    setLenses(
      lenses.map((lens, i) => {
        if (i === index) {
          return { ...lens, focus: value };
        } else {
          return lens;
        }
      })
    );
  }

  function handleChangeDisplayPosition(index: number, value: number) {
    setPositionDisplay(
      position_display.map((pos, i) => {
        if (i === index) {
          return value;
        }
        return pos;
      })
    );
  }

  return (
    <Table aria-label="Lenses">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn className="text-center" key={column.key}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows} emptyContent={"No lens is added."}>
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
