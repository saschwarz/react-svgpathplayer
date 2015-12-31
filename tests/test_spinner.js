import chai from 'chai';
import spies from 'chai-spies';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Spinner from '../src/spinner';

chai.use(spies);
var expect = chai.expect;


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
       });
    });
});
