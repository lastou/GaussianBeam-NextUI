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
  const [num_display, setNumDisplay] = useState(
    lenses.map((lens) => ({
      position: String(lens.position),
      focus: String(lens.focus),
    }))
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
        value={num_display[index].position}
        onValueChange={(value) => handleChangeDisplayPosition(index, value)}
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
        value={num_display[index].focus}
        onValueChange={(value) => handleChangeDisplayFocus(index, value)}
        onBlur={(e) =>
          handleChangeFocus(index, Number((e.target as HTMLInputElement).value))
        }
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
    setNumDisplay(
      [
        ...num_display,
        {
          position: String(default_lens.position),
          focus: String(default_lens.focus),
        },
      ].sort((a, b) => Number(a.position) - Number(b.position))
    );
  }

  function handleDeleteLens(index: number) {
    setLenses(lenses.filter((_, i) => i !== index));
    setNumDisplay(num_display.filter((_, i) => i !== index));
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
    setNumDisplay(
      [...num_display]
        .map((item, i) => {
          if (i === index) {
            return { ...item, position: String(value) };
          }
          return item;
        })
        .sort((a, b) => Number(a.position) - Number(b.position))
    );
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
    setNumDisplay(
      [...num_display].map((item, i) => {
        if (i === index) {
          return { ...item, focus: String(value) };
        }
        return item;
      })
    );
  }

  function handleChangeDisplayPosition(index: number, value: string) {
    setNumDisplay(
      num_display.map((item, i) => {
        if (i === index) {
          return { ...item, position: value };
        }
        return item;
      })
    );
  }

  function handleChangeDisplayFocus(index: number, value: string) {
    setNumDisplay(
      num_display.map((item, i) => {
        if (i === index) {
          return { ...item, focus: value };
        }
        return item;
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
