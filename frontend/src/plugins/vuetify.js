import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#f9a11b'
            }
        }
    },
    data() {
        return {
            drawer: true,
            color: 'primary',
            colors: [
                'primary',
                'blue',
                'success',
                'red',
                'teal',
            ],
            right: false,
            miniVariant: false,
            expandOnHover: true,
            background: true,
            alignmentsAvailable: [
                'start',
                'center',
                'end',
                'baseline',
                'stretch',
            ],
            alignment: 'center',
            dense: false,
            justifyAvailable: [
                'start',
                'center',
                'end',
                'space-around',
                'space-between',
            ],
            justify: 'center',
        }
    },
    icons: {
        iconfont: 'md'
    },
});