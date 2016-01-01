import chai from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Controls from '../src/controls';

chai.use(spies);
var expect = chai.expect;

function setupControls(props) {
  let renderer = TestUtils.createRenderer()
  renderer.render(<Controls {...props} />)
  let output = renderer.getRenderOutput();

  return {
    output,
    renderer
  }
}


describe('Components', () => {
    describe('Controls', () => {
        it('displays disabled/inactive when mode is "loading"', () => {
            let {output} = setupControls({mode: 'loading',
                                          backward: chai.spy(),
                                          forward: chai.spy(),
                                          pause: chai.spy(),
                                          play: chai.spy()});

            // traverse all elements
            expect(output.type).to.equal('div');
            expect(output.props).to.have.property('className', 'buttons');

            let [buttons, status] = output.props.children;

            expect(buttons.type).to.equal('span');
            expect(buttons.props).to.not.have.property('className');

            expect(status.type).to.equal('div');
            expect(status.props).to.have.property('className', 'status');

            let [playPause, bwdFwd] = buttons.props.children;

            let [play, pause] = playPause.props.children;
            expect(play.type).to.equal('button');
            expect(play.props).to.have.property('disabled', true);

            expect(pause.type).to.equal('button');
            expect(pause.props).to.have.property('disabled', true);

            let [bwd, fwd] = bwdFwd.props.children;
            expect(bwd.type).to.equal('button');
            expect(bwd.props).to.have.property('disabled', true);

            expect(fwd.type).to.equal('button');
            expect(fwd.props).to.have.property('disabled', true);

            let [steps, distance] = status.props.children;
            expect(steps.type).to.equal('label');
            expect(steps.props).to.have.property('className', 'steps inactive');

            expect(distance.type).to.equal('label');
            expect(distance.props).to.have.property('className', 'distance inactive');
        });
        it('displays backward/forward buttons when their callbacks are provided', () => {
            let {output} = setupControls({mode: 'segment',
                                          backward: chai.spy(),
                                          forward: chai.spy()});

            let [buttons, status] = output.props.children;

            expect(buttons.type).to.equal('span');
            expect(buttons.props).to.not.have.property('className');

            expect(status.type).to.equal('div');
            expect(status.props).to.have.property('className', 'status');

            let [playPause, bwdFwd] = buttons.props.children;
            // no playPause buttons
            expect(playPause).to.equal(undefined);

            let [bwd, fwd] = bwdFwd.props.children;
            expect(bwd.type).to.equal('button');
            expect(bwd.props).to.have.property('disabled', false);

            expect(fwd.type).to.equal('button');
            expect(fwd.props).to.have.property('disabled', false);
        });
        it('displays play/pause buttons when their callbacks are provided', () => {
            let {output} = setupControls({mode: 'path',
                                          play: chai.spy(),
                                          pause: chai.spy()});

            let [buttons, status] = output.props.children;

            expect(buttons.type).to.equal('span');
            expect(buttons.props).to.not.have.property('className');

            expect(status.type).to.equal('div');
            expect(status.props).to.have.property('className', 'status');

            let [playPause, bwdFwd] = buttons.props.children;
            // no bwd/fwd step buttons
            expect(bwdFwd).to.equal(undefined);

            let [play, pause] = playPause.props.children;
            expect(play.type).to.equal('button');
            expect(play.props).to.have.property('disabled', false);

            expect(pause.type).to.equal('button');
            expect(pause.props).to.have.property('disabled', false);
            expect(pause.props).to.have.property('style').to.have.property('display', 'none');
        });
        it('hides play and shows pause when path is playing', () => {
            let {output} = setupControls({mode: 'playing',
                                          play: chai.spy(),
                                          pause: chai.spy()});

            let [buttons, status] = output.props.children;

            expect(buttons.type).to.equal('span');
            expect(buttons.props).to.not.have.property('className');

            expect(status.type).to.equal('div');
            expect(status.props).to.have.property('className', 'status');

            let [playPause, bwdFwd] = buttons.props.children;
            // no bwd/fwd step buttons
            expect(bwdFwd).to.equal(undefined);

            let [play, pause] = playPause.props.children;
            // hide play
            expect(play.type).to.equal('button');
            expect(play.props).to.have.property('disabled', false);
            expect(play.props).to.have.property('style').to.have.property('display', 'none');
            // show pause
            expect(pause.type).to.equal('button');
            expect(pause.props).to.have.property('disabled', false);
            expect(pause.props).to.have.property('style').to.have.property('display', 'inline');
        });
        it('correct step number range is displayed', () => {
            let {output} = setupControls({mode: 'segment',
                                          step: 0,
                                          forward: chai.spy(),
                                          backward: chai.spy()});

            let [buttons, status] = output.props.children;
            let [steps, distance] = status.props.children;
            expect(steps.props.children).to.eql([1, ' - ', 2]);
        });
        it('negative step number is displayed as 0', () => {
            let {output} = setupControls({mode: 'segment',
                                          step: -1,
                                          forward: chai.spy(),
                                          backward: chai.spy()});

            let [buttons, status] = output.props.children;
            let [steps, distance] = status.props.children;
            expect(steps.props.children).to.eql([0, ' - ', 1]);
        });
        it('position and length are displayed', () => {
            let props = {mode: 'segment',
                         position: 1,
                         length: 100,
                         forward: chai.spy(),
                         backward: chai.spy()};
            let {output} = setupControls(props);

            let [buttons, status] = output.props.children;
            let [steps, distance] = status.props.children;
            expect(distance.props.children).to.eql([props.position.toFixed(1), ' : ', props.length.toFixed(1), ' ', '']);
        });
        it('position, length, and units are displayed when scaled', () => {
            let props = {mode: 'segment',
                         position: 36.0,
                         length: 360.0,
                         scale: 1 / 36.0,
                         units: 'yds',
                         forward: chai.spy(),
                         backward: chai.spy()};
            let {output} = setupControls(props);

            let [buttons, status] = output.props.children;
            let [steps, distance] = status.props.children;
            expect(distance.props.children).to.eql([(props.position * props.scale).toFixed(1),
                                                    ' : ', (props.length * props.scale).toFixed(1),
                                                    ' ', props.units]);
        });
        it('position, length, and units with zero decimal places', () => {
            let props = {mode: 'segment',
                         position: 36.0,
                         length: 360.0,
                         scale: 1 / 36.0,
                         units: 'yds',
                         decimalPlaces: 0,
                         forward: chai.spy(),
                         backward: chai.spy()};
            let {output} = setupControls(props);

            let [buttons, status] = output.props.children;
            let [steps, distance] = status.props.children;
            expect(distance.props.children).to.eql([(props.position * props.scale).toFixed(0),
                                                    ' : ', (props.length * props.scale).toFixed(0),
                                                    ' ', props.units]);
        });
    });
    describe('Controls', () => {
        beforeEach(function(){
            this.props = {
                backward: chai.spy(),
                forward: chai.spy(),
                mode: 'path',
                pause: chai.spy(),
                play: chai.spy()
            }
            this.output = TestUtils.renderIntoDocument(<Controls {...this.props}/>);
        });
        it('clicking forward button fires forward callback', function() {
            expect(this.output.props.forward).to.not.have.been.called();
            let button = TestUtils.findRenderedDOMComponentWithClass(this.output, 'step-forward');
            TestUtils.Simulate.click(button);
            expect(this.output.props.forward).to.have.been.called();
        });
        it('clicking backward button fires backward callback', function() {
            expect(this.output.props.backward).to.not.have.been.called();
            let button = TestUtils.findRenderedDOMComponentWithClass(this.output, 'step-backward');
            TestUtils.Simulate.click(button);
            expect(this.output.props.backward).to.have.been.called();
        });
        it('clicking play button fires play callback', function() {
            expect(this.output.props.play).to.not.have.been.called();
            let button = TestUtils.findRenderedDOMComponentWithClass(this.output, 'play');
            TestUtils.Simulate.click(button);
            expect(this.output.props.play).to.have.been.called();
        });
        it('clicking pause button fires pause callback', function() {
            expect(this.output.props.pause).to.not.have.been.called();
            let button = TestUtils.findRenderedDOMComponentWithClass(this.output, 'pause');
            TestUtils.Simulate.click(button);
            expect(this.output.props.pause).to.have.been.called();
        });
    });
})
