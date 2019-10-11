function global:Invoke-BashCmd
{
    $Error.Clear()
    $LastExitCode = 0

    Write-Host "Args:" $args

    # Exec command
    $cygpath = c:\cygwin64\bin\cygpath.exe -u ${pwd}
    c:\cygwin64\bin\bash.exe --login -c "cd $cygpath && $args"

    if ($Error.Count -gt 0 -or $LastExitCode -ne 0) {
        Write-Host "*** Error:"
        $Error
        exit 1
    }
}

function global:New-BashCmdProfile
{
    cat bash.ps1 >> $profile.AllUsersCurrentHost
}