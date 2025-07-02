//
//  NativeEmergencySOS.swift
//  RemoteWorkerTracker
//
//  Created by Shabib Hossain on 2025-07-02.
//

import Foundation

@objcMembers public class NativeEmergencySOS: NSObject {
  
  public func triggerSOS(callback: @escaping (String) -> Void) {
    DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + 0.5) {
      callback("Emergency SOS Alert Triggered")
    }
  }
}

