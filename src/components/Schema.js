import * as Yup from 'yup';
export const CategorySchema = Yup.object().shape({
  foodName: Yup.string()
    .trim()
    .matches(/^[A-Z0-9a-z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/, 'Không được nhập kí tự đặc biệt')
    .min(0, 'Tên dài ít nhất một kí tự!')
    .max(100, 'Tên quá dài!')
    .required('Hãy nhập tên!'),

  price: Yup.string().required('Hãy nhập giá tiền!')
    .matches(/^(([1-9]{1}[0-9]{4})|1[0-9]{5}|200000)$/, 'Giá tiền trong khoảng từ 10.000 đến 200.000!'),

});
export const FoodSchema = Yup.object().shape({
  total: Yup.number().positive().integer('Chỉ nhập số nguyên!')
    .typeError('Chỉ được nhập số!')
    .required('Hãy nhập số lượng!')
    .min(1, 'Số lượng ít nhất là 1!')
    .max(100, 'Số lượng không được vượt quá 100! '),

  price: Yup.string().required('Hãy nhập giá tiền!')
    .matches(/^(([1-9]{1}[0-9]{4})|1[0-9]{5}|200000)$/, 'Giá tiền trong khoảng từ 10.000 đến 200.000!'),

  note: Yup.string().trim()
    .max(120, 'Ghi chú quá dài!')
});

export const LoginSchema = Yup.object().shape({
  account: Yup.string()
    .trim()
    .required('Hãy nhập tên tài khoản!')
    .max(50, 'Tên tài khoản quá dài!')
    .typeError('Tên tài khoản không hợp lệ!'),
  password: Yup.string().required('Hãy nhập mật khẩu!')
    .trim()
    .min(1, 'Mật khẩu phải ít nhất 1 kí tự!')
    .max(30, 'Mật khẩu không vượt quá 30 kí tự!')
});

export const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .matches(/^[A-Za-z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/, 'Tên không gồm chữ số!')
    .max(255, 'Tên quá dài!')
    .required('Hãy nhập tên!'),
  department: Yup.string().trim().max(255).required('Hãy nhập tên đơn vị!'),
  phone: Yup.string()
    .matches(/^(?:\+84|0)(?:1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/, 'Số điện thoại không tồn tại!')
    .required(' Hãy nhập số điện thoại'),
  // .typeError('Số điện thoại chỉ chứa chữ số!'),
  account: Yup.string().max(50)
    .matches(/^[A-Za-z0-9]*$/, 'Tên tài khoản không gồm ký tự đặc biệt')
    .trim().required('Hãy nhập tên tài khoản'),
  password: Yup.string().trim()
    .min(8, 'Mật khẩu phải ít nhất 8 kí tự!')
    .max(30, 'Mật khẩu không vượt quá 30 kí tự!')
    .required('Hãy nhập mật khẩu!'),
  rePassword: Yup.string().trim()
    // .min(8, 'Mật khẩu phải ít nhất 8 kí tự!')
    // .max(30, 'Mật khẩu không vượt quá 30 kí tự!')
    .required('Hãy nhập lại mật khẩu!'),
});
export const CategorySchema2 = Yup.object().shape({
  foodItems: Yup.array().of(
    Yup.object().shape({
      foodName: Yup.string()
        .trim()
        .matches(/^[A-Z0-9a-z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/, 'Không được nhập kí tự đặc biệt')
        .min(0, 'Tên dài ít nhất một kí tự!')
        .max(50, 'Tên quá dài!')
        .required('Hãy nhập tên!'),
      price: Yup.string().required('Hãy nhập giá tiền!')
        .matches(/^(([1-9]{1}[0-9]{4})|1[0-9]{5}|200000)$/, 'Giá tiền trong khoảng từ 10.000 đến 200.000!')
    })
  )
});