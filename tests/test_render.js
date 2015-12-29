import {expect} from 'chai';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SVGPathPlayer from '../src/svgpathplayer';
import Spinner from '../src/spinner';

function setup(props) {
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
    describe('Spinner', () =>{
       it('displays when loading prop is true', () => {
           let renderer = TestUtils.createRenderer()
           renderer.render(<Spinner />)
           let output = renderer.getRenderOutput();

           expect(output.type).to.equal('div')
           expect(output.props).to.have.property('className', 'loading glyphicon glyphicon-refresh glyphicon-spin');
           expect(output.props).to.have.property('style').to.be.empty;
       });

       it('does not display when loading prop is not true', () => {
           let renderer = TestUtils.createRenderer()
           renderer.render(<Spinner loading={false}/>)
           let output = renderer.getRenderOutput();

           expect(output.type).to.equal('div')
           expect(output.props).to.have.property('className').to.equal('loading glyphicon glyphicon-refresh glyphicon-spin');
           expect(output.props).to.have.property('style').to.have.property('display', 'none');
       })

    });
/*    describe('SVGPathPlayer', () => {
        it('with minimal props should render all controls', () => {
            const { output } = setup();

            expect(output.type).to.equal('div');
            expect(output.props.className).to.equal('svg-path-player');

            let [ loading, container, controls ] = output.props.children;

            expect(loading.type).to.equal(Spinner);
            expect(loading.props.children.props.className).to.equal('loading glyphicon glyphicon-refresh glyphicon-spin');

            expect(container.type).to.equal('div');
            expect(container.props.className).to.equal('svg-container svg-container-box');

        });

        it('when image doesn\' load and spinner is configured spinner is visible', () => {
            const { output } = setup();
            let [ loading, container, controls ] = output.props.children;
            console.log(loading.props);
            expect(loading.type).to.equal(Spinner);
            expect(loading.props.children.props.className).to.equal('loading glyphicon glyphicon-refresh glyphicon-spin');
        });
        it('when image doesn\' load and spinner is not configured spinner is not visible', () => {
            const { output } = setup({loading: false});
            let children = output.props.children;
            expect(children).to.have.length(3);
            expect(children[0]).to.equal('');
        });
*/

    // it('should call addTodo if length of text is greater than 0', () => {
    //   const { output, props } = setup()
    //   let input = output.props.children[1]
    //   input.props.onSave('')
    //   expect(props.addTodo.calls.length).toBe(0)
    //   input.props.onSave('Use Redux')
    //   expect(props.addTodo.calls.length).toBe(1)
    // })
//  })
})
