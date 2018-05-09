import React, {Component} from 'react';
import isEqualWith from 'lodash.isequalwith';
import {
  	SpringGrid,
  	CSSGrid,
  	makeResponsive,
  	measureItems,
  	layout as layouts,
  	enterExitStyle as enterExitStyles
} from '../../../src/index';

export default class extends Component {
  	constructor(props) {
    	super(props);
    	this.state = this.createGrid(props);
  	}

  	componentWillReceiveProps(nextProps) {
    	if (
      		!isEqualWith(nextProps, this.props, (a, b, key) => {
        	if (key === 'children') return true;
      		})
    	) {
      		this.setState(this.createGrid(nextProps));
    	}
  	}

  	createGrid = ({useCSS, measured, responsive}) => {
    	let Grid = SpringGrid;

    	if (measured) {
      		Grid = measureItems(Grid);
    	}

    	if (responsive) {
      		Grid = makeResponsive(Grid, {
        		maxWidth: 1920,
        		minPadding: 0
      		});
    	}

    	return {Grid};
  	};

  	render() {
    	const {
      		children,
			useCSS,
			responsive,
			layout,
			enterExitStyle,
			duration,
			easing,
			stiffness,
			damping,
			gutters,
			itemWidth,
			columns,
			...rest
    	} = this.props;

    	console.log("this.props = ", this.props);

    	const {Grid} = this.state;

    	const gridLayout = layouts["simple"];
    	const gridEnterExitStyle = enterExitStyles["simple"];

    	return (
      		<Grid
		        {...rest}
		        className="grid"
		        component="ul"
		        columns={true}
		        columnWidth={itemWidth}
		        gutterWidth={5}
		        gutterHeight={5}
		        layout={gridLayout}
		        enter={gridEnterExitStyle.enter}
		        entered={gridEnterExitStyle.entered}
		        exit={gridEnterExitStyle.exit}
		        perspective={600}
		        duration={1}
		        easing={"cubic-bezier(0.215, 0.61, 0.355, 1)"}
		        springConfig={{stiffness: 100, damping: 14}}>
		        {children}
      		</Grid>
    	);
  	}
}
