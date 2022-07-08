import * as bcrypt from 'bcryptjs';

const hash = (pass: string) => bcrypt.hashSync(pass, 8);

export default hash;
