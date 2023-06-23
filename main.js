import {Search} from "./modules/search.js";
import {View} from "./modules/view.js";
import {Api} from "./modules/api.js";
import {Log} from "./modules/log.js";

const api = new Api();
const log = new Log();

const view = new View();
const search = new Search(view, api, log);