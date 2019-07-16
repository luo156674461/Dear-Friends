'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Home = function Home(resolve) {
    return require(['./views/navigation/Home.vue'], resolve);
};
var deal = function deal(resolve) {
    return require(['./views/navigation/deal.vue'], resolve);
};
var Suspend = function Suspend(resolve) {
    return require(['./views/navigation/Suspend'], resolve);
};
var personage = function personage(resolve) {
    return require(['./views/navigation/personage.vue'], resolve);
};
var Login = function Login(resolve) {
    return require(['./views/login/Login.vue'], resolve);
};

var NotFound = function NotFound(resolve) {
    return require(['./views/hint/404.vue'], resolve);
};

var qcode = function qcode(resolve) {
    return require(['./views/share/qcode.vue'], resolve);
};

var qr_code = function qr_code(resolve) {
    return require(['./views/share/qr_code.vue'], resolve);
};

var Purlist = function Purlist(resolve) {
    return require(['./views/dealwid/Purlist'], resolve);
};
var Selllist = function Selllist(resolve) {
    return require(['./views/dealwid/Selllist'], resolve);
};
var DeaBuy = function DeaBuy(resolve) {
    return require(['./views/dealwid/DeaBuy.vue'], resolve);
};
var Place = function Place(resolve) {
    return require(['./views/dealwid/Place.vue'], resolve);
};
var SingleCancel = function SingleCancel(resolve) {
    return require(['./views/dealwid/SingleCancel'], resolve);
};
var Cancel = function Cancel(resolve) {
    return require(['./views/dealwid/Cancel'], resolve);
};
var gathering = function gathering(resolve) {
    return require(['./views/dealwid/gathering'], resolve);
};
var Appeal = function Appeal(resolve) {
    return require(['./views/dealwid/Appeal'], resolve);
};
var Matrix = function Matrix(resolve) {
    return require(['./views/nomFunction/Matrix.vue'], resolve);
};
var Account = function Account(resolve) {
    return require(['./views/nomFunction/Account.vue'], resolve);
};
var Fundes = function Fundes(resolve) {
    return require(['./views/nomFunction/FundsManagement.vue'], resolve);
};
var Hang = function Hang(resolve) {
    return require(['./views/nomFunction/Hang.vue'], resolve);
};
var Past = function Past(resolve) {
    return require(['./views/nomFunction/past.vue'], resolve);
};
var Orderform = function Orderform(resolve) {
    return require(['./views/nomFunction/OrderForm.vue'], resolve);
};
var Sets = function Sets(resolve) {
    return require(['./views/nomFunction/Set.vue'], resolve);
};
var Group = function Group(resolve) {
    return require(['./views/nomFunction/Group.vue'], resolve);
};
var Direct = function Direct(resolve) {
    return require(['./views/nomFunction/Direct.vue'], resolve);
};
var Store = function Store(resolve) {
    return require(['./views/nomFunction/Store.vue'], resolve);
};
var GroupSon = function GroupSon(resolve) {
    return require(['./views/nomFunction/GroupSon.vue'], resolve);
};
var Dankcard = function Dankcard(resolve) {
    return require(['./views/nomFunction/nomAccount/Dankcard.vue'], resolve);
};
var Identity = function Identity(resolve) {
    return require(['./views/nomFunction/nomAccount/Identity.vue'], resolve);
};
var Weixin = function Weixin(resolve) {
    return require(['./views/nomFunction/nomAccount/Weixin.vue'], resolve);
};
var Alipay = function Alipay(resolve) {
    return require(['./views/nomFunction/nomAccount/Alipay.vue'], resolve);
};
var Site = function Site(resolve) {
    return require(['./views/nomFunction/nomAccount/Site.vue'], resolve);
};
var loginPass = function loginPass(resolve) {
    return require(['./views/nomFunction/nomAccount/alterinfo/loginPass.vue'], resolve);
};
var dealPass = function dealPass(resolve) {
    return require(['./views/nomFunction/nomAccount/alterinfo/dealPass.vue'], resolve);
};
var AddSite = function AddSite(resolve) {
    return require(['./views/nomFunction/nomAccount/siteinfo/AddSite.vue'], resolve);
};

var routes = [{
    path: '/login',
    component: Login,
    name: '',
    hidden: true
}, {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
}, {
    path: '/',
    component: Home,
    name: '矩阵',
    iconCls: 'el-icon-message' }, {
    path: '/deal',
    component: deal,
    name: '交易',
    children: [{ path: '/purlist', component: Purlist, name: '我要购买', hidden: true }, { path: '/selllist', component: Selllist, name: '我要出售', hidden: true }, { path: '/deabuy', component: DeaBuy, name: '购买', hidden: true }]
}, {
    path: '/suspend',
    component: Suspend,
    name: '挂单',
    hidden: true
}, {
    path: '/personage',
    component: personage,
    name: '个人信息',
    children: [{
        path: '/account',
        component: Account,
        name: '用户管理',
        children: [{ path: '/dankcard', component: Dankcard, name: '银行卡信息', hidden: true }, { path: '/weixin', component: Weixin, name: '微信信息', hidden: true }, { path: '/alipay', component: Alipay, name: '支付宝信息', hidden: true }, { path: '/site', component: Site, name: '地址信息', children: [{ path: '/addsite', component: AddSite, name: '添加地址', hidden: true }] }, { path: '/loginpass', component: loginPass, name: '登录密码修改', hidden: true }, { path: '/dealpass', component: dealPass, name: '交易密码修改', hidden: true }]
    }, {
        path: '/matrix',
        component: Matrix,
        name: '矩阵历史',
        hidden: true
    }, {
        path: '/fundes',
        component: Fundes,
        name: '资金管理',
        hidden: true
    }, {
        path: '/direct',
        component: Direct,
        name: '直通交易',
        hidden: true
    }, {
        path: '/hang',
        component: Hang,
        name: '我的挂单',
        hidden: true
    }, {
        path: '/store',
        component: Store,
        name: '积分商城',
        hidden: true
    }, {
        path: '/past',
        component: Past,
        name: '我的历史',
        hidden: true
    }, {
        path: '/orderform',
        component: Orderform,
        name: '我的订单',
        hidden: true
    }, {
        path: '/group',
        component: Group,
        name: '我的团队',
        hidden: true
    }, {
        path: '/groupson',
        component: GroupSon,
        name: '直推列表',
        hidden: true
    }, {
        path: '/set',
        component: Sets,
        name: '设置',
        hidden: true
    }]
}, {
    path: '/place',
    component: Place,
    name: '下单',
    hidden: true
}, {
    path: '/appeal',
    component: Appeal,
    name: '申诉',
    hidden: true
}, {
    path: '/cancel',
    component: Cancel,
    name: '取消',
    hidden: true
}, {
    path: '/singlecancel',
    component: SingleCancel,
    name: '取消下单',
    hidden: true
}, {
    path: '/gathering',
    component: gathering,
    name: '确定收款',
    hidden: true
}, {
    path: '/qr_code',
    component: qr_code,
    name: '二维码',
    hidden: true
}, {
    path: '/qcode/',
    component: qcode,
    name: '二维码跳转页面',
    hidden: true
}, {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
}];

exports.default = routes;