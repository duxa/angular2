﻿using System;

namespace Duxa.Microservices
{
    public interface IIoC : IDisposable
    {
        T Resolve<T>() where T : class;
        IIoC Register<T>(Func<IIoC, T> func);
    }
}
