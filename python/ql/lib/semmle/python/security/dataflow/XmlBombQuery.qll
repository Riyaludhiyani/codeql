/**
 * Provides a taint-tracking configuration for detecting "XML bomb" vulnerabilities.
 *
 * Note, for performance reasons: only import this file if
 * `Configuration` is needed, otherwise
 * `XmlBombCustomizations` should be imported instead.
 */

import python
import semmle.python.dataflow.new.DataFlow
import semmle.python.dataflow.new.TaintTracking
import XmlBombCustomizations::XmlBomb

private module XmlBombConfig implements DataFlow::ConfigSig {
  predicate isSource(DataFlow::Node source) { source instanceof Source }

  predicate isSink(DataFlow::Node sink) { sink instanceof Sink }

  predicate isBarrier(DataFlow::Node node) { node instanceof Sanitizer }

  predicate observeDiffInformedIncrementalMode() { any() }
}

/** Global taint-tracking for detecting "XML bomb" vulnerabilities. */
module XmlBombFlow = TaintTracking::Global<XmlBombConfig>;
