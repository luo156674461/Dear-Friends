import { Button, Collapse, CollapseItem, Tabbar, TabbarItem, Icon, Slider, Popup, Picker, RadioGroup, Radio,  Cell, CellGroup, Row, Col, Switch, DatetimePicker} from 'vant'
const components = [Button, Collapse, CollapseItem, Tabbar, TabbarItem, Icon, Slider, Popup, Picker, RadioGroup, Radio,  Cell, CellGroup, Row, Col, Switch, DatetimePicker ]
export default {
    install(Vue) {
        components.forEach(c => Vue.use(c))
    }
}