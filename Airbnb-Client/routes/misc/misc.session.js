/**
 * @file 		: 	misc.session.js
 * @author		: 	Niranjan Tungatkar
 * @Description : 	contains functions related to session management.
 * @functions	: 	setSession
 * 					sessionDestroy
 *  				setSessionCart	
 */

/*
 * Sets the session after the user has logged in.
 * Not called by any api request.
 * Internally called by :
 * user.signin.js
 * 
 */
var mq_client = require('../../rpc/client');

exports.setSession = function(req,username){
	req.session.username = username;
}

/*
 * Called by :
 * /getusersession
 * Functionality :
 * 
 * Check if session is valid.
 * If yes statuscode = 0,
 * 		  message = "valid session"
 * 		  result = username of session holder	
 * 
 * If no statuscode = 1
 * 		 messagae = "invalid session"
 * 		 result = null
 * 
 * In case of exception return 
 *       status = 501
 *       statuscode = 1
 *       message = "Internal server error : " + actual error 
 * 		 result = null
 */
exports.getSession = function(req,res){
	var response = {
			statuscode : 0,
			message : "",
			result : ""
	};
	try
	{
		if(req.session.username)
		{
			msg_payload = {username : req.session.username}	
			mq_client.make_request('checkCredentials_queue',msg_payload, function(err,result){
				if(result.err){
					response.statuscode = 1;
					response.message = "invalid session";
					response.result = null;
					res.send(response);				
				}
				else 
				{
					response.statuscode = result.statuscode;
					response.message = "valid session";
					response.username = req.session.username;
					response.credentials = result.data
					res.send(response);
				}  
			});	
		}
		else
		{
			response.statuscode = 1;
			response.message = "invalid session";
			response.result = null;
			res.send(response);
		}
	}
	catch(error)
	{
		console.log("Error occured while fetching session details!");
		console.log("Error : "+error);
		response.statuscode = 1;
		response.message = "Internal Server Error Occured : " +error;
		response.result = req.session.username;
		res.status(501).send(response);
	}
	
}


/*
 * Called by :
 * /user/logout
 *
 * Functionality :
 *
 * Delete user session.
 * If successful
 * 		statuscode = 0,
 * 		message = "User session successfully deleted"
 * 		result = null
 * 
 * In case of exception return 
 *       status = 501
 *       statuscode = 1
 *       message = "Internal server error : " + actual error 
 * 		 result = null
 */
exports.sessionDestroy = function(req,res)
{
	var response = {
			statuscode : 0,
			message : "",
			result : ""
	};
	
	try{
		response.statuscode = 0;
		response.message = "User session successfully deleted";
		response.result = null;
		req.session.destroy();
		res.send(response);
	}
	catch(error)
	{
		console.log("Error occured while deleting user session!");
		console.log("Error : "+error);
		response.statuscode = 1;
		response.message = "Internal Server Error Occured : " + error;
		response.result = null;
		res.send(response);
	}
};

