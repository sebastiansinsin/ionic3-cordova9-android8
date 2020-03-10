import { FormGroup } from "@angular/forms";
import { File } from "@ionic-native/file";
import { FirebaseAnalyticsOriginal } from "@ionic-native/firebase-analytics";
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import { UUID } from "angular2-uuid";
import dirnameRegex from "dirname-regex";
import filenameRegex from "filename-regex";
import * as moment from "moment";
import { ENV } from "../environments/environment";



export const isProduction = ENV.production;
let currentEvent = "notfound";

export let getuserFull = () => {
    let data: any = {};
    data.user = JSON.parse(localStorage.getItem("user")) || {};
    data.package = JSON.parse(localStorage.getItem("package")) || {};
    data.company = JSON.parse(localStorage.getItem("company")) || {};
    data.user_module_role =
        JSON.parse(localStorage.getItem("user_module_role")) || {};
    data.language = JSON.parse(localStorage.getItem("language")) || {};
    return data;
};
export let getPackage = () => {
    return JSON.parse(localStorage.getItem("package")) || {};
};

export let getDataRegister = () => {
    return JSON.parse(localStorage.getItem('register')) || {};
}

export let getCampaign = () => {
    return JSON.parse(localStorage.getItem('campaign')) || {};
}

export let uuidAnalytics = UUID.UUID();
export let getDataAnalytics = (name: string, objData?: any, screen?: boolean, register?: boolean) => {
    let mom = moment();
    let city = localStorage.getItem("city") || "notfound";
    let dataUser: any = getuserFull();
    let dataRegister: any = getDataRegister();
    let packageData = getPackage();
    let dataPush: any = {
        screen_name: name,
        event_name: name,
        dimension2: uuidAnalytics,
        time1: mom.format("X"),
        time2: mom.format("MMMM DD, YYYY, hh:mm:ss a"),
        time3: mom.format("X (MMMM DD, YYYY, hh:mm:ss a)"),
        pageview: true,
        old_history: currentEvent
    };
    if (dataUser.user) {
        dataPush = {
            screen_name: name,
            event_name: name,
            dimension2: uuidAnalytics,
            pageview: true,
            data_user: true,
            user_name: dataUser.user.name,
            package_name: dataUser.package.package_name,
            city: city,
            company_id: dataUser.user.company_id,
            user_id: dataUser.user.uuid,
            email: dataUser.user.email,
            phone: dataUser.user.phone,
            time1: mom.format("X"),
            time2: mom.format("MMMM DD, YYYY, hh:mm:ss a"),
            time3: mom.format("X (MMMM DD, YYYY, hh:mm:ss a)"),
            package_start_date: packageData.start_date
                ? moment(packageData.start_date).format("MMMM DD, YYYY, hh:mm:ss a")
                : packageData.start_date,
            package_end_date: packageData.end_date
                ? moment(packageData.end_date).format("MMMM DD, YYYY, hh:mm:ss a")
                : packageData.end_date,
            language: dataUser.language.name,
            old_history: currentEvent
        };
    }
    if (dataRegister.user) {
        dataPush = {
            screen_name: name,
            event_name: name,
            dimension2: uuidAnalytics,
            pageview: true,
            data_user: true,
            user_name: dataRegister.user.name,
            package_name: 'Free',
            city: city,
            company_id: dataRegister.user.company_id,
            user_id: dataRegister.user.uuid,
            email: dataRegister.user.email,
            phone: dataRegister.user.phone,
            time1: mom.format("X"),
            time2: mom.format("MMMM DD, YYYY, hh:mm:ss a"),
            time3: mom.format("X (MMMM DD, YYYY, hh:mm:ss a)"),
            package_start_date: null,
            package_end_date: null,
            language: 'Indonesia',
            old_history: currentEvent
        };
        localStorage.removeItem('register');
    }
    if (objData) dataPush.data = objData;
    console.log('dataPush', dataPush);
    currentEvent = name;
    return dataPush;
}

export const setScreenAnalytics = (screen: string, firebase?: FirebaseAnalyticsOriginal) => {
    if (isProduction) {
        if (firebase) {
            let data = getDataAnalytics(screen, null, true);
            Promise.all([
                firebase.logEvent(screen, data),
                firebase.setCurrentScreen(screen)
            ]).then(() => { });
        }
    }
};

export const setEventAnalytics = (
    name: string,
    firebase: FirebaseAnalyticsOriginal,
    data: any = null
) => {
    if (isProduction) {
        if (firebase) {
            let datafirebase = getDataAnalytics(name, data);
            firebase.logEvent(name, datafirebase).then(() => { });
        }
    }
};

export const setUserIdAnalytics = firebase => {
    let uuid = localStorage.getItem("user_id");
    let data: any = {};
    data.user = JSON.parse(localStorage.getItem("user")) || {};
    data.package = JSON.parse(localStorage.getItem("package")) || {};
    data.company = JSON.parse(localStorage.getItem("company")) || {};
    data.language = JSON.parse(localStorage.getItem("language")) || {};

    console.log("data firebase", data)
    let user_properties = {
        company_email: data.company.company_email,
        user_email: data.user.email,
        company_uuid: data.company.uuid,
        user_uuid: data.user.uuid,
        company_type: data.company.company_type,
        business_type_child: data.company.business_type_child,
        business_type_parent: data.company.business_type_parent,
        company_name: data.company.company_name,
        package_name: data.package.package_name,
        company_language: data.language.name,
        company_city: data.company.company_city
    }
    // let userName = localStorage.getItem("user_name");
    if (isProduction && uuid) {
        if (firebase) {
            firebase.setUserId(uuid).then(() => { });
            firebase.setUserProperty(user_properties).then(() => { });
        }
    }
};

export class GreaterDateValidator {
    static isGreater(group: FormGroup) {
        let fromDate = group.controls["from"].value;
        let toDate = group.controls["to"].value;
        if (fromDate && toDate) {
            let isGreater =
                moment(toDate, "YYYY-MM-DD") >= moment(fromDate, "YYYY-MM-DD");

            console.log("isGreater", isGreater, fromDate, toDate);
            if (!isGreater) {
                group.controls["to"].setErrors({ 'greater': true });
                return { greater: true };
            } else {
                group.controls["to"].setErrors(null);
                return null;
            }
        } else {
            return null;
        }
    }
}
export const formatDate = (date: string) => {
    return date
        .split("-")
        .reverse()
        .join("/");
};

export function pickImage(options: ImagePickerOptions = {}): Promise<any> {
    interface ImagePath {
        name: string;
        dir: string;
        path: string;
    }
    const imagePickerOptions: ImagePickerOptions = !options
        ? ({ maximumImagesCount: 1 } as ImagePickerOptions)
        : options;

    function extractSingleImage(
        images: string | Array<string>
    ): Promise<ImagePath> {
        return new Promise((resolve, reject) => {
            let imagePath: string = images instanceof Array ? images[0] : images;

            let filename: string = imagePath.match(filenameRegex())[0];
            let dirname: string = imagePath.match(dirnameRegex())[1];

            if (filename == null || dirname == null) {
                reject(new ReferenceError("Invalid image's path"));
            } else {
                resolve({
                    name: filename,
                    dir: dirname,
                    path: imagePath
                });
            }
        });
    }

    function readAsArrayBuffer(image: ImagePath) {
        return new Promise((resolve: any, reject: any) => {
            let newFile = new File();
            newFile
                .readAsArrayBuffer(image.dir, image.name)
                .then((entry: any) => {
                    let data: any = {
                        name: image.name,
                        blob: new Blob([new Uint8Array(entry)])
                    };
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    return new ImagePicker()
        .getPictures(imagePickerOptions)
        .then(extractSingleImage)
        .then(readAsArrayBuffer);
}
