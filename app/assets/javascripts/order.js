// 验证表单
function check(){
	var area = $('#address_area').val();
	// areaLen = area.replace(/(^\s*)|(\s*$)/g,"").length;

	var contactName = $('#address_contact_name').val();
	contactNameLen = contactName.replace(/(^\s*)|(\s*$)/g,"").length;

	var address = $('#address_address').val();
	addressLen = address.replace(/(^\s*)|(\s*$)/g,"").length;

	var cellphone = $('#address_cellphone').val();
	cellphoneLen = cellphone.replace(/(^\s*)|(\s*$)/g,"").length;

  //验证手机号
  regu = /^1[3|4|5|7|8][0-9]\d{8}$/
  phone = cellphoneLen > 0 && regu.test(cellphone)
	// contactName = $.trim(contactName)

	if(area == '--请选择--'){
		$('.error-area').show();
	}else{
		$('.error-area').hide();
	}

	if (contactNameLen == 0){							
		$('.error-contact').show();
	}else{
		$('.error-contact').hide();
	}

	if(addressLen == 0){
		$('.error-address').show();
	}else{
		$('.error-address').hide();
	}
	
	if(cellphoneLen == 0){
		$('.error-cellphone').children(2).text("请您填写收货人手机号码");
		$('.error-cellphone').show();
	}else if(!phone){
		$('.error-cellphone').children(2).text("手机号不正确");
		$('.error-cellphone').show();
	}else{
		$('.error-cellphone').hide();
	}

	if (area == '--请选择--' || contactNameLen == 0 || addressLen == 0 || cellphoneLen == 0 || !phone){
		return false;
	}else {
		return true;
	}
	
}

function showAddress(){
	$.post('/address/new', function(data){
		addressPop(data);
	});
};

function editAddress(addressId){
	$.post('/address/edit', {id: addressId}, function(data){
		addressPop(data);
	});
}

function addressHide(){
	var $hide = $("#address-back");
	$hide.hide();
	$('.address-con').hide();
}

function addressPop(data){
	if($(".order-new").find('.tan-ku').length > 0){
			$('.tan-ku').remove();
		}
	$(".order-new").append($(data));
}

$(function(){
	$("#city").click(function (e) {
		SelCity(this,e);
	});

});

$(function(){
	// 点击设置默认地址后变成默认地址
	$(document).on('click', '.set-address', function(){
		var addressId = $(this).next().val();
		$.post('/addresses/update-params', {id: addressId}, function(data){
			var orderContent = $(data).find(".order-content-w").html();
			$('.order-content-w').html(orderContent);
		});
	});

	$(document).on('click', '.address-area-common', function(){
		$('.address-area-common').each(function(){
			$(this).attr('style', 'border: 1px solid #ddd;');
			$('b').remove();
		});
		$(this).attr('style', 'border: 2px solid #e4393c;')
		$(this).append("<b></b>");

		var addressId = $(this).parent().children(':last').find('input').val();
		$.post('/addresses/update-params', {id: addressId, type: "changeSelect"});
	})
});