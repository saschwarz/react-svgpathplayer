import chai from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Controls from '../src/controls';
import Spinner from '../src/spinner';
import SVGPathPlayer from '../src/svgpathplayer';

chai.use(spies);
var expect = chai.expect;

function setupPlayer(props) {
  props = props || {
      svg: 'image.svg',
      path: '.path'
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<SVGPathPlayer {...props} />)
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('components', () => {
    describe('SVGPathPlayer', () => {
        it('with minimal props should render all elements', () => {
            const { output } = setupPlayer();

            expect(output.type).to.equal('div');
            expect(output.props.className).to.equal('svg-path-player');

            let [ loading, container, controls ] = output.props.children;
            expect(loading.type).to.equal(Spinner);

            expect(container.type).to.equal('div');
            expect(container.props.className).to.equal('svg-container svg-container-box');

            expect(controls.type).to.equal(Controls);
        });
        // it('when image doesn\'t load and spinner is configured spinner is visible', () => {
        //     const { output } = setupPlayer();
        //     let [ loading, container, controls ] = output.props.children;
        //     console.log(loading.props);
        //     expect(loading.type).to.equal(Spinner);
        //     expect(loading.props.children.props.className).to.equal('loading glyphicon glyphicon-refresh glyphicon-spin');
        // });
        // it('when image doesn\'t load and spinner is not configured spinner is not visible', () => {
        //     const { output } = setupPlayer({loading: false});
        //     let children = output.props.children;
        //     expect(children).to.have.length(3);
        //     expect(children[0]).to.equal('');
        // });
    });
});
