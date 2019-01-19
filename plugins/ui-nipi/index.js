import NI from './lib/ni';

const options = {

}

const nipi = new NI(options);


export default app => {
  app.nipi = true;
  app.nipi = nipi;
}

