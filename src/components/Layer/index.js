import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  unstable_renderSubtreeIntoContainer, // eslint-disable-line camelcase
  unmountComponentAtNode
} from 'react-dom';

/**
 * Create a new "layer" on the page, like a modal or overlay.
 * Appending to the body DOM element.
 *
 * <Layer className="layer">
 *     ..........
 * </Layer>
 */
class Layer extends Component {
  componentDidMount() {
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
  }

  unrenderLayer() {
    if (!this.layer) {
      return;
    }

    unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  renderLayer() {
    const {
      children,
      ...otherProps
    } = this.props;

    if (!this.layer) {
      this.layer = document.createElement('div');
      document.body.appendChild(this.layer);
    }

    const layerElement = (
      <div {...otherProps}>
        {children}
      </div>
    );

    unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
  }

  render() {
    return null;
  }
}

Layer.propTypes = {
  children: PropTypes.node,
};

export default Layer;
