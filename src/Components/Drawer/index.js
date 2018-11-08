/* tslint:disable:jsx-no-multiline-js */
import React from 'react';
import DrawerLayout from './DrawerLayout';

export default class Drawer extends React.Component {
    static defaultProps = {
        position: 'left',
        open: false,
        drawerWidth: 300
    };

    componentDidMount() {
        if (this.props.open && this.drawer) {
            this.drawer.openDrawer();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.props.open && this.drawer) {
            this.drawer[nextProps.open ? 'openDrawer' : 'closeDrawer']();
        }
    }

    onOpenChange(isOpen) {
        if (this.props.onOpenChange) {
            this.props.onOpenChange(isOpen);
        }
    }

    render() {
        const {
            sidebar,
            position,
            drawerRef,
            drawerWidth = 300,
            ...restProps
        } = this.props;
        [
            'onOpenChange',
            'onDrawerOpen',
            'onDrawerClose',
            'drawerPosition',
            'renderNavigationView'
        ].forEach(prop => {
            if (restProps.hasOwnProperty(prop)) {
                delete (restProps)[prop];
            }
        });
        // tslint:disable-next-line:variable-name
        let _position = (DrawerLayout).positions.Left;
        if (position === 'right') {
            _position = (DrawerLayout).positions.Right;
        }
        return (
            <DrawerLayout
                ref={el => {
                    if (drawerRef) {
                        drawerRef(el);
                    }
                    this.drawer = el;
                }}
                renderNavigationView={() => sidebar}
                drawerPosition={_position}
                onDrawerOpen={() => this.onOpenChange(true)}
                onDrawerClose={() => this.onOpenChange(false)}
                keyboardDismissMode="on-drag"
                drawerWidth={drawerWidth}
                {...restProps}
            />
        );
    }
}
