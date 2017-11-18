import React from "react";

class Audio extends React.Component {
  render() {
    return (
      <div>
        <audio id="teres">
          <source
            src="/sites/default/files/forchildren/teres.ogg"
            type="audio/ogg"
          />
          <source
            src="/sites/default/files/forchildren/teres.mp3"
            type="audio/mp3"
          />
          Ваш браузер не поддерживает тег audio!
        </audio>
        <audio id="teres_mar">
          <source
            src="/sites/default/files/forchildren/teres_mar.ogg"
            type="audio/ogg"
          />
          <source
            src="/sites/default/files/forchildren/teres_mar.mp3"
            type="audio/mp3"
          />
          Ваш браузер не поддерживает тег audio!
        </audio>
      </div>
    );
  }
}

export default Audio;
