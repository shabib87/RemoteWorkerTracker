//
//  RCTNativeEmergencySOS.m
//  RemoteWorkerTracker
//
//  Created by Shabib Hossain on 2025-07-02.
//

#import "RCTNativeEmergencySOS.h"
#import "RemoteWorkerTracker-Swift.h"

@implementation RCTNativeEmergencySOS {
  NativeEmergencySOS *sos;
}

- (id)init {
  self = [super init];
  if (self) {
    sos = [[NativeEmergencySOS alloc] init];
  }
  return self;
}

+ (NSString *)moduleName { 
  return @"NativeEmergencySOS";
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeEmergencySOSSpecJSI>(params);
}

- (void)triggerSOS:(nonnull RCTPromiseResolveBlock)resolve reject:(nonnull RCTPromiseRejectBlock)reject { 
  [sos triggerSOSWithCallback:^(NSString * _Nonnull message) {
    resolve(message);
  }];
}

@end
