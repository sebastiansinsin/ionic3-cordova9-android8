import { FirebaseX } from '@ionic-native/firebase-x';
import { environment } from '../../environments/environment';
import * as moment from "moment";

const isProduction = environment.production;
// const uuidAnalytics = UUID.UUID();
export const getDataAnalytics = (name: string, objData?: any, screen?: boolean, register?: boolean) => {
    let mom = moment();
    let city = localStorage.getItem("city") || "notfound";
    // let dataUser: any = getuserFull();
    // let dataRegister: any = getDataRegister();
    // let packageData = getPackage();
    let dataPush: any = {
        // screen_name: name,
        // event_name: name,
        // dimension2: uuidAnalytics,
        // time1: mom.format("X"),
        // time2: mom.format("MMMM DD, YYYY, hh:mm:ss a"),
        // time3: mom.format("X (MMMM DD, YYYY, hh:mm:ss a)"),
        // pageview: true,
        // old_history: currentEvent
    };
    // if (dataUser.user) {
    //     dataPush = {
    //         screen_name: name,
    //         event_name: name,
    //         dimension2: uuidAnalytics,
    //         pageview: true,
    //         data_user: true,
    //         user_name: dataUser.user.name,
    //         package_name: dataUser.package.package_name,
    //         city: city,
    //         company_id: dataUser.user.company_id,
    //         user_id: dataUser.user.uuid,
    //         email: dataUser.user.email,
    //         phone: dataUser.user.phone,
    //         time1: mom.format("X"),
    //         time2: mom.format("MMMM DD, YYYY, hh:mm:ss a"),
    //         time3: mom.format("X (MMMM DD, YYYY, hh:mm:ss a)"),
    //         package_start_date: packageData.start_date
    //             ? moment(packageData.start_date).format("MMMM DD, YYYY, hh:mm:ss a")
    //             : packageData.start_date,
    //         package_end_date: packageData.end_date
    //             ? moment(packageData.end_date).format("MMMM DD, YYYY, hh:mm:ss a")
    //             : packageData.end_date,
    //         language: dataUser.language.name,
    //         old_history: currentEvent
    //     };
    // }
    // if (dataRegister.user) {
    //     dataPush = {
    //         screen_name: name,
    //         event_name: name,
    //         dimension2: uuidAnalytics,
    //         pageview: true,
    //         data_user: true,
    //         user_name: dataRegister.user.name,
    //         package_name: 'Free',
    //         city: city,
    //         company_id: dataRegister.user.company_id,
    //         user_id: dataRegister.user.uuid,
    //         email: dataRegister.user.email,
    //         phone: dataRegister.user.phone,
    //         time1: mom.format("X"),
    //         time2: mom.format("MMMM DD, YYYY, hh:mm:ss a"),
    //         time3: mom.format("X (MMMM DD, YYYY, hh:mm:ss a)"),
    //         package_start_date: null,
    //         package_end_date: null,
    //         language: 'Indonesia',
    //         old_history: currentEvent
    //     };
    //     localStorage.removeItem('register');
    // }
    // if (objData) dataPush.data = objData;
    // console.log('dataPush', dataPush);
    // currentEvent = name;
    return dataPush;
}

export const setScreenAnalytics = (screen: string, firebase = FirebaseX) => {
    if (firebase && isProduction) {
        const data = getDataAnalytics(screen, null, true);
        Promise.all([
            firebase.logEvent(screen, data),
            firebase.setScreenName(screen)
        ]).then(() => { });
    }
}