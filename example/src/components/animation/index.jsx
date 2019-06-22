import React, { PureComponent } from 'react';

class Animation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isInnerShow: false,
            animationClass: '',
        };
    }

    componentWillReceiveProps(props) {
        const { isShow } = props;
        if (isShow) {
            this.show().then(() => {
                this.doShowAnimation();
            });
        } else {
            this.doFadeAnimation();
        }
    }

    handleAnimationEnd() {
        const isFading = this.state.animationClass === this.className('fading');
        if (isFading) {
            this.hide();
        }
    }

    show() {
        return new Promise(resolve => {
            this.setState(
                {
                    isInnerShow: true,
                },
                () => {
                    resolve();
                }
            );
        });
    }

    hide() {
        this.setState({
            isInnerShow: false,
        });
    }

    doShowAnimation() {
        this.setState({
            animationClass: this.className('showing'),
        });
    }

    doFadeAnimation() {
        this.setState({
            animationClass: this.className('fading'),
        });
    }

    /**
     * 获取className
     * @param {string} inner 'showing' | 'fading'
     */
    className(inner) {
        const { name } = this.props;
        if (!name) throw new Error('animation name must be assigned');
        return `${name}-${inner}`;
    }

    render() {
        let { children } = this.props;
        children = React.Children.only(children);
        const { isInnerShow, animationClass } = this.state;
        const element = {
            ...children,
            props: {
                ...children.props,
                className: `${children.props.className} ${animationClass}`,
                onAnimationEnd: this.handleAnimationEnd.bind(this),
            },
        };
        return isInnerShow && element;
    }
}

export default Animation;
