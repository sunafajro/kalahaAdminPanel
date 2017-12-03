import React, {Component} from "react";

export default class Audio extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.isCorrect === true) {
      this.audioElementTeres.play();
    } else if (newProps.isCorrect === false) {
      this.audioElementTeresMar.play();
    }
  }

  render() {
    return (
      <div>
        <audio id="teres" ref={(audio => this.audioElementTeres = audio )}>
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
        <audio id="teres_mar" ref={(audio => this.audioElementTeresMar = audio )}>
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
}
