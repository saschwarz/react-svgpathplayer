import chai from 'chai';
import spies from 'chai-spies';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Controls from '../src/controls';
import Spinner from '../src/spinner';
import SVGPathPlayer from '../src/svgpathplayer';

chai.use(spies);
chai.use(sinonChai);
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

describe('Components', () => {
    describe('SVGPathPlayer', () => {
        var component, props, sandbox;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            props = {
                svg: 'base/demo/images/pathsegments.svg',
                path:'.dog-path-0', segments:'.dog-path-segments-0', marker:'.dog', loading:true, time:1000
            }
            component = TestUtils.renderIntoDocument(<SVGPathPlayer {...props}/>);
        });
        afterEach(() => {
            sandbox.restore();
        });
        it('initial step forward moves to step 0', () => {
            let transition = sandbox.stub(component, '_transitionSegment');
            component.playSegmentForward();
            expect(transition).to.have.been.calledWith(0);
        });
        it('intermediate step forward moves to next step', () => {
            let transition = sandbox.stub(component, '_transitionSegment');
            component.setState({step: 0, steps: 2});
            component.playSegmentForward();
            expect(transition).to.have.been.calledWith(1);
        });
        it('final step forward moves to step 0', () => {
            let transition = sandbox.stub(component, '_transitionSegment');
            component.setState({step: 0, steps: 1});
            component.playSegmentForward();
            expect(transition).to.have.been.calledWith(0);
        });
        it('initial step backward moves to last step', () => {
            let transition = sandbox.stub(component, '_transitionSegment');
            component.setState({steps: 2});
            component.playSegmentBackward();
            expect(transition).to.have.been.calledWith(1);
        });
        it('intermediate step backward moves to previous step', () => {
            let transition = sandbox.stub(component, '_transitionSegment');
            component.setState({step: 1, steps: 2});
            component.playSegmentBackward();
            expect(transition).to.have.been.calledWith(0);
        });
        it('final step backward moves to step 0', () => {
            let transition = sandbox.stub(component, '_transitionSegment');
            component.setState({step: 1, steps: 2});
            component.playSegmentBackward();
            expect(transition).to.have.been.calledWith(0);
        });
        it('play after loading sets mode to play', () => {
            component.path = {attr: () => {}};
            component.setState({position: 0,
                                length: 100});
            component.play();
            expect(component.state.mode).to.equal('playing');
        });
        it('play at end sets mode to play', () => {
            component.path = {attr: () => {}};
            component.setState({position: 100,
                                length: 100});
            component.play();
            expect(component.state.mode).to.equal('playing');
        });
        it('pause sets mode to path', () => {
            component.snapAnimate = {stop: () => {}};
            component.pause();
            expect(component.state.mode).to.equal('path');
        });
        it('loading with a path that does not exist succeeds', () => {
            component.loadFile(document.createDocumentFragment('<svg></svg>'));
            expect(component.state.mode).to.equal('path');
            expect(component.state.length).to.equal(0);
        });
        it('unmount removes SnapSVG', () => {
            component.svg = {remove: () => {}};
            let removeStub = sandbox.stub(component.svg, 'remove');
            component.componentWillUnmount();
            expect(removeStub).to.have.been.calledWith();
        });
    });
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
        it('while loading image and spinner is configured spinner is visible', () => {
            const { output } = setupPlayer();
            let loading = output.props.children[0];
            expect(loading.props).to.eql({loading: true});
        });
        it('while loading image and spinner is not configured spinner is not visible', () => {
            const { output } = setupPlayer({loading: false});
            let loading = output.props.children[0];
            expect(loading.props).to.eql({loading: false});
        });
    });
});
