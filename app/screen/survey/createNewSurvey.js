import React,{useEffect,useState} from 'react';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {AppButton, AppHeader, FloatingLabel, GoBackHeader, LabelInputText, Loading} from "../common";
import {color, hp, isANDROID, isIOS, normalize, wp} from "../../helper/themeHelper";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import DatePickerModel from "../common/DatePickerModel";
import {addNewSurvey, fetchSurveyList} from "../../redux/actions/surveyAction";
const defaultSurveyData = {
    surveyName:'',
    startDate:new Date(),
    endDate:new Date(),
    description:''
}

const CreateNewSurveyScreen = props => {
    const dispatch = useDispatch();
    const [surveyData,setSurveyData] = useState({...defaultSurveyData});
    const [datePickerFlag ,setDatePickerDialog] = useState(false)
    const [dateForDatePicker, setDateForDatePicker] = useState({});
    const [currentKey, setCurrentKey] = useState();
    const [isStartDateChange,setIsStartDateChange] = useState(false);
    const [isEndDateChange,setISEndDateChange] = useState(false);

    const isLoading = useSelector(state => state.appDefaultSettingReducer.isLoading);
    const renderNameFloatingTextInput = (
        lable,
        value,
        key,
        extraLabel = null,
        keyType = null,
        isMultiLine = false
    ) => {
        return (
            <View
                style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: color.gray,
                    marginHorizontal: wp(0.5),
                }}
            >
                {isMultiLine ? (
                    <LabelInputText
                        multiline={true}
                        numberOfLines={10}
                        inputStyle={style.floatingInputStyle}
                        style={[style.floatingStyle]}
                        label={lable + '  '}
                        editable={true}
                        value={value}
                        keyboardType={keyType !== null ? keyType : 'default'}
                        returnKeyType={'done'}
                        autoCapitalize="characters"
                        extraLabel={extraLabel}
                        onChangeText={(text) => {
                            setSurveyData({ ...surveyData, [key]:text });
                        }}
                    />
                ) : (
                    <FloatingLabel
                        numberOfLines={1}
                        inputStyle={style.floatingInputStyle}
                        style={[style.floatingStyle]}
                        label={lable + '  '}
                        editable={true}
                        value={value}
                        autoCapitalize="characters"
                        extraLabel={extraLabel}
                        keyboardType={keyType !== null ? keyType : 'default'}
                        returnKeyType={'done'}
                        onChangeText={(text) => {
                            setSurveyData({ ...surveyData, [key]: text });
                        }}
                    />
                )}
            </View>
        );
    };
    const renderNameFloatingTextForDate = (lable, value, key, extraLabel = null,isValueChange=false) => {
        return (
            <View
                style={{
                    flex:  1,
                    borderBottomWidth: 1,
                    borderBottomColor: color.gray,
                    marginHorizontal: wp(0.5),
                }}>
                <FloatingLabel
                    numberOfLines={1}
                    inputStyle={style.floatingInputStyle}
                    style={[style.floatingStyle,]}
                    label={lable + '  '}
                    editable={true}
                    value={isValueChange?value:''}
                    autoCapitalize="characters"
                    extraLabel={extraLabel}
                    onFocus={async ()=>{
                        Keyboard.dismiss();
                        await setCurrentKey(key)
                        await _setDateForDatePicker(key);
                        await setDatePickerDialog(true)
                    }}
                />
            </View>
        );
    };
    const _setIsShowDatePicker = value => {
        setDatePickerDialog(value);
    };
    const _setDateForDatePicker = key => {
        setDateForDatePicker(surveyData[key]);
        setCurrentKey(key);
    };
    const _setDateFromKey = (value, timeFlag = true) => {
        _setIsShowDatePicker(false);
        setSurveyData({...surveyData, [currentKey]: value});
        if(currentKey ==='startDate'){
            setIsStartDateChange(true)
        } else if(currentKey === 'endDate'){
            setISEndDateChange(true)
        }
    };
    const saveSurveyToDb = () =>{
        if(surveyData.surveyName ===''){
            alert("please enter survey name")
            return;
        } else if(!isStartDateChange){
            alert("please add survey start date")
            return;
        } else if(!isEndDateChange){
            alert("please add survey end date")
            return;
        } else if(surveyData.description === ''){
            alert("please enter survey description")
            return;
        } else if(surveyData.endDate<surveyData.startDate){
            alert("please select valid end date...it should be greater than start date")
            return;

        } else {
            let insObj = {
                SurvayName:surveyData.surveyName,
                SurveyStartDate:surveyData.startDate,
                SurveyEndDate:surveyData.endDate,
                SurveyDescription:surveyData.description
            }
            dispatch(addNewSurvey(insObj)).then((res)=>{
                if(res){
                    alert("survey create successfully...!");
                    setSurveyData({...defaultSurveyData})
                    props.navigation.goBack();
                    dispatch(fetchSurveyList()).then((res)=>{})
                }
            })
        }
    }

    const createNewSurveyForm = () =>{
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps="handled"
                enableAutomaticScroll={isIOS}
                scrollEnabled={true}
                extraScrollHeight={hp(-1)}
                showsVerticalScrollIndicator={false}>
                <View style={[style.groupView]}>
                    <View style={[style.innerView]}>
                        <View
                            style={{
                                ...style.iconContainer,
                                marginBottom: 0,
                                borderBottomWidth: 1,
                                borderBottomColor: color.gray,
                                paddingVertical: hp(1),
                            }}>
                            {/*<EvilIconsIcon name={'user'} size={hp(3.3)} color={color.blue} />*/}
                        </View>
                        {renderNameFloatingTextInput(
                            'Survey Title',
                            surveyData.surveyName,
                            'surveyName',
                            true
                        )}
                    </View>
                </View>
                <View style={[style.groupView]}>
                    <View style={[style.innerView]}>
                        <View
                            style={{
                                ...style.iconContainer,
                                marginBottom: 0,
                                borderBottomWidth: 1,
                                borderBottomColor: color.gray,
                                paddingVertical: hp(1),
                            }}>
                            {/*<EvilIconsIcon name={'user'} size={hp(3.3)} color={color.blue} />*/}
                        </View>
                        {renderNameFloatingTextForDate(
                            'Survey Start Date',
                            surveyData.startDate,
                            'startDate',
                            true,
                            isStartDateChange
                        )}
                    </View>
                </View>
                <View style={[style.groupView]}>
                    <View style={[style.innerView]}>
                        <View
                            style={{
                                ...style.iconContainer,
                                marginBottom: 0,
                                borderBottomWidth: 1,
                                borderBottomColor: color.gray,
                                paddingVertical: hp(1),
                            }}>
                            {/*<EvilIconsIcon name={'user'} size={hp(3.3)} color={color.blue} />*/}
                        </View>
                        {renderNameFloatingTextForDate(
                            'Survey End Date',
                            surveyData.endDate,
                            'endDate',
                            true,
                            isEndDateChange
                        )}
                    </View>
                </View>
                <View style={[style.groupView]}>
                    <View style={[style.innerView]}>
                        <View
                            style={{
                                ...style.iconContainer,
                                marginBottom: 0,
                                borderBottomWidth: 1,
                                borderBottomColor: color.gray,
                                paddingVertical: hp(1),
                            }}>
                            {/*<EvilIconsIcon name={'user'} size={hp(3.3)} color={color.blue} />*/}
                        </View>
                        {renderNameFloatingTextInput(
                            'Survey Description',
                            surveyData.description,
                            'description',
                            true,
                            null,
                            true

                        )}
                    </View>
                </View>
                <AppButton onPress={()=>{
                    saveSurveyToDb()
                }} containerStyle={{marginTop:hp(2)}} title={'Add'}/>
            </KeyboardAwareScrollView>
        )
    }
    {/*<AppButton onPress={()=>{props.navigation.navigate('CreateNewSurvey')}} containerStyle={{marginTop:hp(2),backgroundColor:'#ff6d5e'}} title={'Create New Survey'}/>*/}

    return (
        <View style={{flex: 1,}}>
            <GoBackHeader
                title={'Back'}
                onMenuPress={() => {
                    props.navigation.goBack()
                }}
            />
            {createNewSurveyForm()}
            {datePickerFlag && (
                <DatePickerModel
                    _setIsShowDatePicker={_setIsShowDatePicker}
                    dateForDatePicker={surveyData[currentKey]}
                    isShow={datePickerFlag}
                    _setDateFromKey={_setDateFromKey}
                    mode={'date'}
                />
            )}
            {isLoading && <Loading isLoading={isLoading} />}

        </View>
    );
};
const style = StyleSheet.create({
    textStyle: {
        // fontFamily: font.robotoRegular,
        color: color.blue,
        fontSize: normalize(13),
    },
    radioButton: {
        marginHorizontal: wp(2),
    },
    innerView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: hp(0.5),
        borderBottomColor: color.gray,
    },
    noteTextStyle: {
        fontSize: normalize(10),
        color: 'red',
        textAlign: 'center',
    },
    alignRow: {
        flexDirection: 'row',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    editProfileView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backArraow: {
        position: 'absolute',
        top: isANDROID ? 5 : 30,
        zIndex: 10,
        margin: hp(1),
        paddingHorizontal: wp(1),
    },
    groupView: {
        backgroundColor: color.creamDarkGray,
        padding: wp(2),
        borderRadius: wp(5),
    },
    iconContainer: {
        marginBottom: isANDROID ? hp(1.5) : hp(1.2),
        marginHorizontal: wp(1),
    },
    floatingStyle: {},
    floatingInputStyle: {
        borderWidth: 0,
        fontSize: normalize(12),
        // fontFamily: font.robotoRegular,
        height: isANDROID ? hp(6) : hp(5),
        marginTop: isANDROID ? hp(3) : hp(2),
    },
    floatingAddressInputStyle: {
        borderWidth: 0,
        fontSize: normalize(12),
        // fontFamily: font.robotoRegular,
        color: color.black,
        justifyContent: 'center',
        padding: hp(1),
        maxHeight: 200,
        marginHorizontal: wp(1),
    },
    floatingLableStyle: {
        // fontFamily: font.robotoRegular,
    },
    trustFactorRow:{flexDirection:'row',alignItems:'center',marginTop:hp(1)},
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        marginVertical: hp(0.5),
        borderBottomColor: color.gray,
        marginHorizontal: wp(1),
        flex: 1,
    },
    fontStyle: {
        color: color.blue,
        fontSize: normalize(17),
        // fontFamily: font.robotoBold,
        textAlign: 'center',
        // marginTop: hp(8),
    },
    subfontStyle: {
        fontSize: normalize(14),
        // fontFamily: font.robotoBold,
        textAlign: 'center',
        marginLeft: wp(1),
        color: color.blue,
        marginTop: wp(2),
    },
    validationStart: {position: 'absolute', color: 'red', marginLeft: wp(16), marginTop: hp(0.5)},
    radioButtonOutterCircle:{alignItems:'center',justifyContent:'center',height:hp(3),width:hp(3),borderRadius:hp(1.5),borderWidth:hp(0.2)},
    radioButtonInnerCircle:{height:hp(1.6),width:hp(1.6),borderRadius:hp(0.8),backgroundColor: color.themePurple}
});

export default CreateNewSurveyScreen;
