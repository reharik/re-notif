import React from 'react';
import PropTypes from 'prop-types';

class Notif extends React.Component {
  componentWillMount() {
    this._id = new Date().getTime();
  }

  /*
   * Handle action click event
   * @description Handle click events on the
   */
  _onActionClick(event) {
    event.preventDefault();
    if (this.props.onActionClick) {
      this.props.onActionClick(this.props.id);
    } else {
      return;
    }
  }

  render() {
    const { kind, CustomComponent, componentClassName, actionLabel } = this.props;
    const component = !CustomComponent ?
      <div className={`${componentClassName} ${componentClassName}--${kind}`}>
          <div className={`${componentClassName}__icon`} />
          <div className={`${componentClassName}__content`}>
            <span className={`${componentClassName}__message`}>{this.props.message}</span>
          </div>
          { actionLabel &&
            <span className={`${componentClassName}__action`}>
              <button onClick={this._onActionClick}>{this.props.actionLabel}</button>
            </span>
          }
          <div className={`${componentClassName}__close`} />
      </div>
      :
      <CustomComponent {...this.props} />;

    return component;
  }
}

Notif.defaultProps = {
  kind: 'info',
};

Notif.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  message: PropTypes.string.isRequired,
  kind: PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired,
  componentClassName: PropTypes.string,
  onActionClick: PropTypes.func,
  actionLabel: PropTypes.string,
  CustomComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element
  ]),
};

export default Notif;
