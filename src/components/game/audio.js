import React from "react";

export default function Audio() {
  return (
    <div>
      <audio id="teres">
        <source
          src="/files/audio/teres.ogg"
          type="audio/ogg"
        />
        <source
          src="/files/audio/teres.mp3"
          type="audio/mp3"
        />
        Ваш браузер не поддерживает тег audio!
      </audio>
      <audio id="teres_mar">
        <source
          src="/files/audio/teres_mar.ogg"
          type="audio/ogg"
        />
        <source
          src="/files/audio/teres_mar.mp3"
          type="audio/mp3"
        />
        Ваш браузер не поддерживает тег audio!
      </audio>
    </div>
  );
}
