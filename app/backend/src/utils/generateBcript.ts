import * as bcrypt from 'bcryptjs';

const hash = (pass: string) => bcrypt.hashSync(pass);

export default hash;
