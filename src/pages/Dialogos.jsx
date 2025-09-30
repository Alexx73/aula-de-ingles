import React from "react";

import audio from "../assets/dialogo_track 33.mp3";
// import audio from "../assets/dialogo_track_33_eng.mp3";
import transcript from "../assets/dialogo_track_33_eng.json";
import DialogoPage3 from "./DialogoPage3";

export default function () {
  return (
    <div>
      <DialogoPage3 audioFile={audio} transcriptFile={transcript} />
    </div>
  );
}
