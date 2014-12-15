angular
	.module("unjs", [])
		.directive("unjsTranslate", unjsTranslate)

		function unjsTranslate($http, $timeout){
			return{
				restrict: 'E',
				scope: {
					text: '@'
				},
				link: function(scope, elem, attrs){
					var localDictionary = window.sessionStorage.getItem("dictionary");
					if(!localDictionary){
						
						$http.get("./scripts/dic.json")
							.success(function(data){
								var remoteDictionary = JSON.stringify(data);

								if(localDictionary){
									if(localDictionary.length !== remoteDictionary.length){
										saveDictionary();
									}
								}else{
									saveDictionary();
								}

								function saveDictionary(){
									window.sessionStorage.removeItem("dictionary");
									window.sessionStorage.setItem("dictionary", remoteDictionary);
								}
									
							})
							console.log('save dictionary');
					}
					$timeout(function(){
						
						if(window.sessionStorage.getItem("dictionary")){
							var dictionary = JSON.parse(window.sessionStorage.getItem("dictionary"));
							scope.term = dictionary[attrs.text].es;
						}
					},500)

				},
				template: '<b>{{term}}</b>',
			}
		}