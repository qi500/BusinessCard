/**
 * @filename qiehuan_businesscard.tsx
 * @author 何晏波
 * @QQ 1054539528
 * @Description: 切换名片
 */
import Taro, {Component, Config} from '@tarojs/taro'
//@ts-ignore
import CustomSafeAreaView from "../../compoments/safe-area-view/index";
//@ts-ignore
import {styleAssign} from "../../utils/datatool";
import {
  bgColor,
  color,
  commonStyles,
  default as styles,
  fSize,
  h,
  ml,
  mt,
  padding,
  radiusA,
  w
} from "../../utils/style";
import {connect} from "@tarojs/redux";
import * as actions from '../../actions/login';
import TopHeader from "../../compoments/top-header/index";
import {Image, Text, View} from "@tarojs/components";
import TouchableButton from "../../compoments/touchable-button/index";
import QieHanItem from "../../compoments/qiehuan-item/index";
import {cloudBaseUrl} from "../../api/httpurl";

interface Props {
  dispatchLogin?: any;
}

interface State {
  signInPageDetail: any;
}

@connect(state => state.login, {...actions})
class QiehuanBusinesscard extends Component<Props, State> {

  private viewRef;


  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {

  }

  constructor(props) {
    super(props);
    this.state = {
      signInPageDetail: {dateIntegrals: [], signInCount: 0},
    }
  }


  render() {
    console.log(this.viewRef);

    let {signInPageDetail} = this.state;

    if (typeof signInPageDetail.signInCount === 'undefined') {
      signInPageDetail.signInCount = 0
    }


    return (
      <CustomSafeAreaView ref={(ref) => {
        this.viewRef = ref;
      }} customStyle={styleAssign([bgColor(commonStyles.whiteColor)])}
                          notNeedBottomPadding={true}>
        <TopHeader title={'切换名片'}/>
        <View style={styleAssign([styles.uf1, styles.uac, bgColor(commonStyles.pageDefaultBackgroundColor)])}>
          <QieHanItem/>
          {/*添加新名片*/}
          <View
            style={styleAssign([mt(16), styles.uac, styles.ujc, styles.udr, w(335), h(128), radiusA(4), bgColor(commonStyles.whiteColor),
              padding([20, 16, 20, 16])])}>
            <TouchableButton customStyle={styleAssign([styles.udr, styles.uac])}>
              <Image style={styleAssign([w(22), h(25)])}
                     src={`${cloudBaseUrl}ico_add.png`}/>
              <Text style={styleAssign([fSize(16), color('#CECECE'), ml(10)])}>添加新名片</Text>
            </TouchableButton>
          </View>
        </View>
      </CustomSafeAreaView>);
  }
}

export default QiehuanBusinesscard;
