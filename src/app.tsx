import '@tarojs/async-await'
import Taro, {Component, Config} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'
import Index from './pages/businesscard/businesscard'
import configStore from './store'
import './app.scss'
import {Global} from "../global";
import {commonStyles} from "./utils/style";

declare let global: Global;
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {

  constructor(props) {
    super(props);

    console.log('呵呵',global);

    global.debug = true;
    Taro.getSystemInfo({
      success: res => {
        global = Object.assign(global, res, {debug: true});
        if (res.model && res.model.includes('iPhone X')) {
          global.iphoneX = true;
          console.log('是iphoneX机型')
        } else if (res.platform === 'ios' && res.screenHeight === 812 && res.screenWidth === 375 ||
          res.screenHeight === 896 && res.screenWidth === 414) {
          global.iphoneX = true;
          console.log('是iphoneX机型')
        } else {
          global.iphoneX = false;
          console.log('不是iphoneX机型')
        }
        console.log('设备信息', global);
      }

    }).then(res => console.log(res));
    //生产环境屏蔽所有log信息优化性能
    if (!global.debug) {
      console.info = () => {
      };
      console.log = () => {
      };
      console.warn = () => {
      };
      console.debug = () => {
      };
      console.error = () => {
      };
    }
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      "pages/businesscard/businesscard",
      "pages/radarscan/radarscan",
      "pages/customer/customer",
      "pages/mine/mine",
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom'
    },
    tabBar: {
      custom: false,
      color: "#9b9b9b",
      selectedColor: commonStyles.colorTheme,
      backgroundColor: "white",
      borderStyle: 'white',
      list: [{
        pagePath: "pages/businesscard/businesscard",
        iconPath: "./assets/ico_tabar_businesscard_normal.png",
        selectedIconPath: "./assets/ico_tabar_businesscard_pressed.png",
        text: "名片",
      }, {
        pagePath: "pages/radarscan/radarscan",
        iconPath: "./assets/ico_tabar_radarscan_normal.png",
        selectedIconPath: "./assets/ico_tabar_radarscan_pressed.png",
        text: "雷达",
      }, {
        pagePath: "pages/customer/customer",
        iconPath: "./assets/ico_tabar_customer_normal.png",
        selectedIconPath: "./assets/ico_tabar_customer_pressed.png",
        text: "客户",
      }, {
        pagePath: "pages/mine/mine",
        iconPath: "./assets/ico_tabar_mine_normal.png",
        selectedIconPath: "./assets/ico_tabar_mine_pressed.png",
        text: "我的",
      }]
    }
  }

  componentWillMount() {

  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'));
