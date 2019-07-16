//导航路由
const Home = resolve => require(['./views/navigation/Home.vue'], resolve) //主页
const deal = resolve => require(['./views/navigation/deal.vue'], resolve) //交易
const Suspend = resolve => require(['./views/navigation/Suspend'], resolve); // 挂单路由
// const RobMine = './views/navigation/RobMine.vue'  //抢矿
const personage = resolve => require(['./views/navigation/personage.vue'], resolve) // 个人


// 登入路由
const Login = resolve => require(['./views/login/Login.vue'], resolve)

// 404路由
const NotFound = resolve => require(['./views/hint/404.vue'], resolve)

// 分享注册路由
const qcode = resolve => require(['./views/share/qcode.vue'], resolve)

// 分享注册二维码
const qr_code = resolve => require(['./views/share/qr_code.vue'], resolve)


//交易子路由
const Purlist = resolve => require(['./views/dealwid/Purlist'], resolve); //购买路由
const Selllist = resolve => require(['./views/dealwid/Selllist'], resolve); //出售路由
const DeaBuy = resolve => require(['./views/dealwid/DeaBuy.vue'], resolve); // 下单路由
const Place = resolve => require(['./views/dealwid/Place.vue'], resolve); // 下单成功未付款
const SingleCancel = resolve => require(['./views/dealwid/SingleCancel'], resolve) // 再次确认取消
const Cancel = resolve => require(['./views/dealwid/Cancel'], resolve) // 取消
const gathering = resolve => require(['./views/dealwid/gathering'], resolve) // 确定收款
const Appeal = resolve => require(['./views/dealwid/Appeal'], resolve) // 申诉

//主页子路由
const Matrix = resolve => require(['./views/nomFunction/Matrix.vue'], resolve); // 矩阵历史





//个人信息子路由
const Account = resolve => require(['./views/nomFunction/Account.vue'], resolve) //账号管理
const Fundes = resolve => require(['./views/nomFunction/FundsManagement.vue'], resolve); //资金管理
const Hang = resolve => require(['./views/nomFunction/Hang.vue'], resolve); //挂单管理
const Past = resolve => require(['./views/nomFunction/past.vue'], resolve); //历史管理
const Orderform = resolve => require(['./views/nomFunction/OrderForm.vue'], resolve); // 订单管理
const Sets = resolve => require(['./views/nomFunction/Set.vue'], resolve); // 设置
const Group = resolve => require(['./views/nomFunction/Group.vue'], resolve); // 我的团队
const Direct = resolve => require(['./views/nomFunction/Direct.vue'], resolve); // 直通交易
const Store = resolve => require(['./views/nomFunction/Store.vue'], resolve); // 积分商城
const GroupSon = resolve => require(['./views/nomFunction/GroupSon.vue'], resolve); // 团队子页
const Notice = resolve => require(['./views/nomFunction/Notice.vue'], resolve); // 系统公告

//订单管理
const Underway = resolve => require(['./views/nomFunction/Underway.vue'], resolve);
const Complete = resolve => require(['./views/nomFunction/Complete.vue'], resolve);

//用户管理子路由
const Dankcard = resolve => require(['./views/nomFunction/nomAccount/Dankcard.vue'], resolve); //银行卡信息
const Identity = resolve => require(['./views/nomFunction/nomAccount/Identity.vue'], resolve); //身份证信息
const Weixin = resolve => require(['./views/nomFunction/nomAccount/Weixin.vue'], resolve); //微信信息
const Alipay = resolve => require(['./views/nomFunction/nomAccount/Alipay.vue'], resolve); //支付宝信息
const Site = resolve => require(['./views/nomFunction/nomAccount/Site.vue'], resolve); //地址信息
// const PassAlter = resolve => require(['./views/nomFunction/nomAccount/PassAlter.vue'], resolve); //密码修改
const loginPass = resolve => require(['./views/nomFunction/nomAccount/alterinfo/loginPass.vue'], resolve); //密码修改
const dealPass = resolve => require(['./views/nomFunction/nomAccount/alterinfo/dealPass.vue'], resolve); //密码修改
const AddSite = resolve => require(['./views/nomFunction/nomAccount/siteinfo/AddSite.vue'], resolve) //添加地址
// const EditSite = resolve => require(['./views/nomFunction/nomAccount/siteinfo/EditSite.vue'], resolve) //编辑地址



let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '矩阵',
        children: [
            { path: '/matrix', component: Matrix, name: '矩阵历史', hidden: true },
            { path: '/fundes', component: Fundes, name: '资金管理', hidden: true },
            { path: '/past', component: Past, name: '我的历史', hidden: true },
            { path: '/direct', component: Direct, name: '直通交易', hidden: true },
        ]
    },
    {
        path: '/deal',
        component: deal,
        name: '交易',
        children: [
            { path: '/purlist', component: Purlist, name: '我要购买', hidden: true },
            { path: '/selllist', component: Selllist, name: '我要出售', hidden: true },
            { path: '/deabuy', component: DeaBuy, name: '购买', hidden: true },
        ]
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
            children: [
                // { path: '/identity', component: Identity, name: '身份证信息', hidden: true },
                { path: '/dankcard', component: Dankcard, name: '银行卡信息', hidden: true },
                { path: '/weixin', component: Weixin, name: '微信信息', hidden: true },
                { path: '/alipay', component: Alipay, name: '支付宝信息', hidden: true },
                { path: '/loginpass', component: loginPass, name: '登录密码修改', hidden: true },
                { path: '/dealpass', component: dealPass, name: '交易密码修改', hidden: true },
                {
                    path: '/site',
                    component: Site,
                    name: '地址信息',
                    children: [
                        { path: '/addsite', component: AddSite, name: '添加地址', hidden: true },
                    ]
                },
            ]
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
            children: [
                { path: '/underway', component: Underway, name: '进行中', hidden: true },
                { path: '/complete', component: Complete, name: '已完成', hidden: true },
            ]
        }, {
            path: '/group',
            component: Group,
            name: '我的团队',
            hidden: true
        }, {
            path: '/notice',
            component: Notice,
            name: '系统公告',
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
    },
    {
        path: '/orderform',
        component: Orderform,
        name: '我的订单',
        children: [
            { path: '/underway', component: Underway, name: '进行中', hidden: true },
            { path: '/complete', component: Complete, name: '已完成', hidden: true },
        ]
    },
    {
        path: '/place',
        component: Place,
        name: '下单',
        hidden: true
    },
    {
        path: '/appeal',
        component: Appeal,
        name: '申诉',
        hidden: true
    },
    {
        path: '/cancel',
        component: Cancel,
        name: '取消',
        hidden: true
    },
    {
        path: '/singlecancel',
        component: SingleCancel,
        name: '取消下单',
        hidden: true
    },
    {
        path: '/gathering',
        component: gathering,
        name: '确定收款',
        hidden: true
    },
    {
        path: '/qr_code',
        component: qr_code,
        name: '二维码',
        hidden: true
    },
    {
        path: '/qcode/',
        component: qcode,
        name: '二维码跳转页面',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;