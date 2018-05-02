#!/bin/bash

# This script is responsible to setup the linux build agents.

vstsPat=$1
agentNumber=$2

ConfigAgents () 
{
    cd /home/builder/build/agents/$agentNumber

    # Now we setup the new agent.
    bash ./config.sh --unattended --url https://msr-project-everest.visualstudio.com --auth pat --token $vstsPat --pool MsrEverestPoolLinux --agent $agentNumber --acceptTeeEula
}

ConfigAgents

echo "Done configuring agents."