import {
	NativeModules,
	NativeEventEmitter,
	Platform
} from 'react-native'

const TwilioVoice = NativeModules.TwilioVoice

const NativeAppEventEmitter = new NativeEventEmitter(TwilioVoice)

const _eventHandlers = {
	deviceReady: new Map(),
	deviceNotReady: new Map(),
	deviceDidReceiveIncoming: new Map(),
	connectionDidConnect: new Map(),
	connectionDidDisconnect: new Map(),
	//iOS specific
	callRejected: new Map(),
}

const Twilio = {
    initWithToken(token) {
        return TwilioVoice.initWithAccessToken(token)
    },
    // this method is only avaialble on ios
    initWithTokenUrl(url) {
        if (Platform.OS === 'ios') {
            TwilioVoice.initWithAccessTokenUrl(url)
        }
    },
    connect(params = {}) {
        TwilioVoice.connect(params)
    },
    disconnect() {
        TwilioVoice.disconnect()
    },
    // this method is not avaialble on ios
    accept() {
        if (Platform.OS === 'ios') {
            return
        }
        TwilioVoice.accept()
    },
    // this method is not avaialble on ios
    reject() {
        if (Platform.OS === 'ios') {
            return
        }
        TwilioVoice.reject()
    },
    // this method is not avaialble on ios
    ignore() {
        if (Platform.OS === 'ios') {
            return
        }
        TwilioVoice.ignore()
    },
    setMuted(isMuted) {
        TwilioVoice.setMuted(isMuted)
    },
    setSpeakerPhone(value) {
        TwilioVoice.setSpeakerPhone(value)
    },
    sendDigits(digits) {
        TwilioVoice.sendDigits(digits)
    },
    // this method is only available on Android
    requestPermissions(senderId) {
        if (Platform.OS === 'android') {
            TwilioVoice.requestPermissions(senderId)
        }
    },
    // this method is not avaialble on ios
    getActiveCall() {
        if (Platform.OS === 'ios') {
            return
        }
        return TwilioVoice.getActiveCall()
    },
    // this method is only avaialble on ios
    configureCallKit(params = {}) {
        if (Platform.OS === 'ios') {
            TwilioVoice.configureCallKit(params)
        }
    },
    // this method is only avaialble on ios
    unregister() {
        if (Platform.OS === 'ios') {
            TwilioVoice.unregister()
        }
    },
    addEventListener (type, handler) {
        if (_eventHandlers[type].has(handler)) {
            return
        }
        _eventHandlers[type].set(handler, NativeAppEventEmitter.addListener(
            type, (rtn) => {
                handler(rtn)
            }
        ))
    },
    removeEventListener (type, handler) {
        if (!_eventHandlers[type].has(handler)) {
            return
        }
        _eventHandlers[type].get(handler).remove()
        _eventHandlers[type].delete(handler)
    }
}

export default Twilio
