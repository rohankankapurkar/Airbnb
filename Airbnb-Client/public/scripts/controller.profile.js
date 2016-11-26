
airbnbApp.controller('controllerProfile',function($scope,$log,$http){
	
	
	
	
	$http({
		method : "GET",
		url : '/user/update_profile',
//		data : {
//			
//			"username" : $scope.user_email,
//		
//		}
	}).success(function(data){
		if (data.statuscode == 0)
		{
			console.log("got the show_prfile data"+data.username);
			//printing the user name here babyslash@gmail.com{"_id":"5832d422402a63fcf41fc033","username":"slash@gmail.com","password":"f70feeaffcd3f592a4fb7812b7d86d","firstname":"bapu","lastname":"jamm","birthday":"2016-11-01","ishost":false,"id":"428-82-0311","lastLogin":"Mon Nov 21 2016 03:24:32 GMT-0800 (PST)","sex":"Female","phone":"1234","user_preferred_locale":"de","user_native_currency":"CLP","city":"lonfon","about":"man i aint cool"}

			$scope.user_first_name = data.firstname;
			$scope.user_last_name=data.lastname;
			$scope.user_email = data.username;
			$scope.sex=data.sex;
			$scope.phone=data.phone;
			$scope.city=data.city;
			$scope.about=data.about;
			$scope.user_native_currency= data.user_native_currency;
			$scope.user_preferred_locale=data.user_preferred_locale;
			$scope.user_creditcard = data.credit_card;
			$scope.profile_pic = data.profile_pic;
			
			
		}
		else
		{
			if(data.message != null)
			{
				$scope.invEmail = "";
				$scope.invEmail = data.message;
			}
		}
	}).error(function(error) {
		console.log("error");
	});
	
	
	
	$scope.update_Profile = function()
	{
		
		console.log("Inside update profile " + $scope.user_first_name);
		console.log("bc profile pic");
		
		  $scope.profile_pic = $("#profile_pic").val();
		  console.log( $scope.profile_pic);
		{
			$http({
				method : "POST",
				url : '/user/update_profile',
				data : {
					"user_first_name" : $scope.user_first_name,
					"user_last_name" : $scope.user_last_name,
					"user_sex" : $scope.sex,
					"user_birthday" : $scope.user_birthday_month+ $scope.user_birthday_date+$scope.user_birthday_date,
					"user_email" : $scope.user_email,
					"user_phone" : $scope.phone,
					"user_preferred_locale" : $scope.user_preferred_locale,
					"user_native_currency" :$scope.user_native_currency,
					"user_city" : $scope.city,
					"user_about":$scope.about,
					"credit_card" : $scope.user_creditcard,
					"profile_pic" :$scope.profile_pic
				}
			}).success(function(data){
				if (data.statuscode == 0)
				{
					console.log("updated the profile successfully");
				}
				else
				{
					if(data.message != null)
					{
						$scope.invEmail = "";
						$scope.invEmail = data.message;
					}
				}
			}).error(function(error) {
				console.log("error");
			});
		}
		
	}

	$http({
		method : "POST",
		url : '/host/getmyproperties',
		data : {}
	}).success(function(property){
		if (property.statuscode == 0)
		{
			//console.log("got the host property data"+property.result.data);
			

		   //console.log("sappaliga"+property.data[0].street);
		  //console.log("printing the received JSON obj" +JSON.stringify(property.result.data));
			
			
			$scope.properties = property.result.data;
			
		
			
			
		}
		else
		{
			if(property.message != null)
			{
				$scope.invEmail = "";
				$scope.invEmail = data.message;
			}
		}
	}).error(function(error) {
		console.log("error");
	});


	
	
	
})



//this is for showing the listing for the host


























