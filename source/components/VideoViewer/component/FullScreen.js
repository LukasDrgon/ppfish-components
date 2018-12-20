import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../../Icon/index.tsx';
import Tooltip from '../../Tooltip/index.tsx';

export default class FullScreen extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    vjsComponent: PropTypes.object
  };

  static defaultProps = {
    prefixCls: 'fishd-video-viewer-fullscreen'
  }

  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: props.vjsComponent.player_.isFullscreen()
    }
  }

  componentDidMount() {
    this.watchFullScreen();
  }

  // 监听fullscreenchange事件
  watchFullScreen = () => {
    const _self = this;
    document.addEventListener(
      "fullscreenchange",
      function() {
        _self.setState({
          isFullScreen: document.fullscreen
        });
      },
      false
    );

    document.addEventListener(
      "mozfullscreenchange",
      function() {
        _self.setState({
          isFullScreen: document.mozFullScreen
        });
      },
      false
    );

    document.addEventListener(
      "webkitfullscreenchange",
      function() {
        _self.setState({
          isFullScreen: document.webkitIsFullScreen
        });
      },
      false
    );
  }

  handleClick = () => {
    const { vjsComponent } = this.props;
    const { isFullScreen } = this.state;

    if(!isFullScreen) {
      vjsComponent.player_.requestFullscreen();

    }else{
      vjsComponent.player_.exitFullscreen();
    }

    this.setState({
      isFullScreen: !isFullScreen
    })
  }

  render() {
    const { prefixCls } = this.props;
    const { isFullScreen } = this.state;
    const title = !isFullScreen ? '全屏' : '取消全屏';

    return (
      <div className={classnames(prefixCls, "fishd-video-js-customer-button")}>
        <Tooltip title={title} getPopupContainer={(e) => e.parentNode}>
          <a onClick={()=>this.handleClick()}>
            {
              !!isFullScreen ? <Icon type="video-shrink"/> : <Icon type="video-fullscreen"/>
            }
          </a>
        </Tooltip>
      </div>
    );
  }
}
