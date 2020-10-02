function Remove-All-Containers {
	docker container stop $(docker ps -aq)
	docker container rm $(docker ps -aq)
}

function Show-Help {
	Write-Host ""
	Write-Host "Bot Docker Control Script" -ForegroundColor blue
	Write-Host ""
	Write-Host "Usage" -ForegroundColor yellow
	Write-Host "
./docker/docker.sh [COMMAND] [ARGS...]
./docker/docker.sh -h | --help"
	Write-Host ""
	Write-Host "Commands" -ForegroundColor yellow
	Write-Host "
build		Builds a Docker image so it is prepped for running
start		Starts a service in detached state
stop		Stops a service
remove		Removes a single service
removeall	Removes all services - For this command no service is required and it can be skipped by just hitting enter when prompted
push		Pushes a docker image to Dockerhub
logs		Shows the logs of a service
tail		Tails the logs of a service
update		Updates a running service"
}

function Step-Run {
	Param (
		[String]$Command = $( Read-Host "What command do you want to run? If unsure type help" ),
		[string]$Service
	)

	Begin {
		if ($Command -Ne "help" -And $Command -Ne "h" -And $Command -Ne "removeall" -And $Service -Eq "") {
			$Service = $( Read-Host "What Docker service do you want to control?" )
		}
	}

	Process {
		switch ($Command) {
			build { docker-compose -p bot -f "$($PSScriptRoot)/docker-compose.yml" -f "$($PSScriptRoot)/docker-build.yml" build $Service }
			start { docker-compose -p bot -f "$($PSScriptRoot)/docker-compose.yml" up -d $Service }
			logs { docker-compose -p bot -f "$($PSScriptRoot)/docker-compose.yml" logs $Service }
			tail { docker-compose -p bot -f "$($PSScriptRoot)/docker-compose.yml" logs -f $Service }
			push { docker push $Service }
			remove { docker-compose -p bot -f "$($PSScriptRoot)/docker-compose.yml" rm -fv $Service }
			update { docker-compose -p bot -f "$($PSScriptRoot)/docker-compose.yml" pull $Service; docker-compose -p bot -f "$($PSScriptRoot)/docker-compose.yml" up -d --force-recreate $Service }
			removeall { Remove-All-Containers }
			default { Show-Help }
		}
	}
}

Step-Run @Args
