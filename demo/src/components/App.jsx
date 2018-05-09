/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { RadioGroup, Radio } from 'react-radio-group';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import shuffle from 'lodash.shuffle';
import camelCase from 'lodash.camelcase';
import Grid from './Grid';
import { easings } from '../../../src/index';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const ipsum = `Who controls the British crown?
Who keeps the metric system down?
Who keeps Atlantis off the maps?
Who keeps the Martians under wraps?
Who holds back the electric car?
Who makes Steve Guttenberg a star?
Who robs cavefish of their sight?
Who rigs every Oscar night?`.split('\n');

const layouts = ['Pinterest', 'Simple'];
const enterExitStyles = [
  'Simple',
  'Skew',
  'Newspaper',
  'Fold Up',
  'From Center',
  'From Left to Right',
  'From Top',
  'From Bottom'
];

const SliderWithTooltip = createSliderWithTooltip(Slider);

export default class extends Component {
  static defaultProps = {
    minItems: 10
  };

  constructor(props) {
    super(props);

    this.state = {
      data: this.generateData(),
      useCSS: false,
      responsive: true,
      layout: camelCase(layouts[0]),
      enterExitStyle: camelCase(enterExitStyles[0]),
      duration: 1,
      stiffness: 100,
      damping: 14,
      columns: 5,
      gutters: 5,
      easing: easings.cubicOut
    };
  }

  handleShuffle = () => {
    this.setState({
      data: this.generateData()
    });
  };

  generateData = () =>
    shuffle(alphabet)
      .slice(
        0,
        this.props.minItems +
          Math.floor(Math.random() * (26 - this.props.minItems))
      )
      .sort();

  render() {
    const { data, ...gridProps } = this.state;
    const {
      useCSS,
      layout,
      enterExitStyle,
      responsive,
      columns,
      gutters,
      stiffness,
      damping,
      duration,
      easing
    } = this.state;

    const itemHeight = 104; //layout === 'simple' ? 190 : null;

    const items = data.map((letter) => {
      const contentIndex = letter.charCodeAt(0) % 6;
      const content = ipsum.slice(
        contentIndex,
        Math.floor(contentIndex * 1.5) + 1
      );

      return (
        <li
          key={letter}
          className="grid-item"
          style={{
            width: 104,
            height: itemHeight
          }}
        >
          <h3>{letter.toUpperCase()}</h3>
          <p>We do! We do!</p>
        </li>
      );
    });

    console.log("gridProps = ", gridProps);

    return (
      <div>
        <div>
          <button onClick={this.handleShuffle}>Randomize children</button>
        </div>
        <Grid
          itemHeight={104}
          itemWidth={104}
          measured={false}
          {...gridProps}>
          {items}
        </Grid>
      </div>
    );
  }
}
