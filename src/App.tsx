import { CustomInput } from "./components/CustomInput";
import { useState } from "react";
import InputBeam from "./components/InputBeam";
import LensTable from "./components/LensTable";
import OutputBeam from "./components/OutputBeam";
import Probe from "./components/Probe";
import { TransformBeam } from "./calculate";
import { Lens } from "./types";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <NextUIProvider>
      <GaussianBeamCalculator />
    </NextUIProvider>
  );
}

function GaussianBeamCalculator() {
  const default_lens = { position: 50, focus: 50 };
  const [wavelength, setWavelength] = useState(1064);
  const [input_beam, setInputBeam] = useState({ position: 0, waist: 50 });
  const [lenses, setLenses] = useState<Lens[]>([default_lens]);
  const [probe_position, setProbePosition] = useState(0);

  let output_beam = input_beam;
  let probe_beam = output_beam;
  for (const lens of lenses) {
    output_beam = TransformBeam(output_beam, lens, wavelength);
    if (probe_position > lens.position) {
      probe_beam = output_beam;
    }
  }

  return (
    <div className="max-w-screen-lg my-10 mx-auto px-4 flex flex-col gap-8">
      <h1 className="text-center text-4xl font-bold">
        Gaussian Beam Calculator
      </h1>

      <div className="flex flex-col gap-4">
        <CustomInput
          className="max-w-56"
          label="Wavelength"
          labelPlacement="outside-left"
          type="number"
          value={String(wavelength)}
          onValueChange={(value) => setWavelength(Number(value))}
          endContent="nm"
        />

        <InputBeam
          input_beam={input_beam}
          setInputBeam={setInputBeam}
          wavelength={wavelength}
        />

        <LensTable
          lenses={lenses}
          setLenses={setLenses}
          input_beam_position={input_beam.position}
          default_lens={default_lens}
        />

        <OutputBeam
          output_beam={output_beam}
          wavelength={wavelength}
          position_last_lens={
            lenses.length > 0
              ? lenses[lenses.length - 1].position
              : input_beam.position
          }
        />

        <Probe
          probe_position={probe_position}
          setProbePosition={setProbePosition}
          probe_beam={probe_beam}
          wavelength={wavelength}
        />
      </div>
    </div>
  );
}
