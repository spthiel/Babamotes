import express from 'express';
import cookieParser from 'cookie-parser';
import * as path from "path";
import * as url from "url";
import * as reactViews from 'express-react-views';

const app = express();
const port = process.env.PORT || 4600;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());

app.use('/assets', express.static(__dirname + "/../webpage/assets"));


app.set('views', __dirname + '/../webpage/react/');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

app.get("*", (req, res) => {
	res.render('templates/Home', {data: req.path});
})

app.listen(port, () => {
	console.log("App listening to port " + port)
})
