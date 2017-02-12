﻿using System;
using System.Collections;
using System.Collections.Generic;

namespace Duxa.Microservices
{
    public interface ISetup : IDisposable
    {
        string Name { get; }
        IIoC IoC { get; }
        ILogger Logger { get; }
        IMonitor Monitor { get; }
        IList<object> Extensions { get; }
    }
}